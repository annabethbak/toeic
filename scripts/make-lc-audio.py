#!/usr/bin/env python3
"""LC 음성 파일 만들기 (Google Cloud Text-to-Speech).

사용법:  python3 scripts/make-lc-audio.py [--check] [--limit N]
  --check  : API 연결과 사용할 음성 이름만 확인하고 파일은 만들지 않음
  --limit N: 처음 N개 클립만 생성(시험용)

- API 키는 이 스크립트에 넣지 않는다. 작업 환경의 Network secret(X-Goog-Api-Key)으로 프록시가 붙여 보낸다.
- 화자 성별·억양을 문항마다 정해(VOICE_MAP) 한 줄씩 MP3로 만든다. 파일 이름은 (음성 이름 + 문장)의 해시라서
  문장이 바뀐 줄만 새로 만들고, 이미 있는 파일은 건너뛴다.
- 결과: audio/lc/<해시>.mp3, data-audio.js (VOICE_MAP과 파일 목록). 앱은 파일이 없으면 브라우저 음성으로 읽는다.
"""
import base64, hashlib, json, pathlib, re, subprocess, sys, time, urllib.request, urllib.error

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'audio' / 'lc'
API = 'https://texttospeech.googleapis.com/v1'

# 억양별 남녀 음성(Neural2). --check로 실제 목록에 있는지 확인한다.
VOICES = {
    'US': {'F': ['en-US-Neural2-F', 'en-US-Neural2-C'], 'M': ['en-US-Neural2-D', 'en-US-Neural2-J']},
    'GB': {'F': ['en-GB-Neural2-A', 'en-GB-Neural2-C'], 'M': ['en-GB-Neural2-B', 'en-GB-Neural2-D']},
    'AU': {'F': ['en-AU-Neural2-A', 'en-AU-Neural2-C'], 'M': ['en-AU-Neural2-B', 'en-AU-Neural2-D']},
}
ACCENTS = ['US', 'GB', 'AU']
NARRATOR = 'en-US-Neural2-C'          # Part 3·4 안내 문장("Questions refer to …")
P4_NARRATOR = {1: 'F', 4: 'M', 7: 'M', 10: 'F', 12: 'F', 18: 'F', 23: 'M'}   # study-core.js와 같은 표


def load_lc():
    js = (ROOT / 'data-lc.js').read_text(encoding='utf8')
    # 보기 표시 순서는 index.html의 seeded()/perm()과 똑같은 JS 코드로 계산한다(비트 연산 차이 방지)
    ix = (ROOT / 'index.html').read_text(encoding='utf8')
    fns = '\n'.join(re.search(r'^function ' + n + r'\(.*$', ix, re.M).group(0) for n in ('seeded', 'perm'))
    code = js + '\n' + fns + '\nprocess.stdout.write(JSON.stringify({P2,P3,P4,ORD:P2.map((_,n)=>perm(3,n*31+2))}));'
    return json.loads(subprocess.run(['node', '-e', code], capture_output=True, text=True, check=True).stdout)


def gender(key, sp):
    if sp in ('M', 'M2'): return 'M'
    if sp in ('W', 'W2'): return 'F'
    i = int(key.split('-')[1]); return P4_NARRATOR.get(i, 'M' if i % 2 else 'F')


def assign(key, speakers, seed):
    """화자마다 다른 억양을 먼저 쓰고, 같은 성별이 둘이면 같은 억양 안의 다른 음성을 쓴다."""
    out, used = {}, set()
    for k, sp in enumerate(speakers):
        g = gender(key, sp)
        acc = ACCENTS[(seed + k) % len(ACCENTS)]
        cand = [v for v in VOICES[acc][g] if v not in used] or [v for a in ACCENTS for v in VOICES[a][g] if v not in used] or VOICES[acc][g]
        out[sp] = cand[0]; used.add(cand[0])
    return out


def seed_of(key):
    p, n = key.split('-'); i = int(n)
    return {'p2': (i // 6) * 9 + i % 6, 'p3': (i // 2) * 9 + 6 + i % 2, 'p4': i * 9 + 8}[p]


def clip_id(voice, text):
    return hashlib.sha1(f'{voice}|{text}'.encode('utf8')).hexdigest()[:14]


def plan():
    d = load_lc(); voice_map, jobs = {}, {}
    def want(voice, text):
        jobs[clip_id(voice, text)] = (voice, text)
    for n, (q, ch, *_rest) in enumerate(d['P2']):
        key = f'p2-{n}'; asker = 'W' if n % 2 else 'M'; other = 'M' if asker == 'W' else 'W'
        vm = assign(key, [asker, other], seed_of(key)); voice_map[key] = vm
        want(vm[asker], q)
        for pos, o in enumerate(d['ORD'][n]): want(vm[other], 'ABC'[pos] + '. ' + ch[o])
        want(vm['W'], ch[0])                       # 오답노트 '다시 듣기'(정답만, 화자 W)
    for part, arr in (('p3', d['P3']), ('p4', d['P4'])):
        for n, s in enumerate(arr):
            key = f'{part}-{n}'; order = []
            for sp, _ in s['lines']:
                if sp not in order: order.append(sp)
            vm = assign(key, order, seed_of(key)); vm['N_INTRO'] = NARRATOR; voice_map[key] = vm
            want(NARRATOR, s['intro'])
            for sp, t in s['lines']: want(vm[sp], t)
    return voice_map, jobs


def call(path, body=None):
    req = urllib.request.Request(API + path, data=json.dumps(body).encode() if body else None,
                                 headers={'Content-Type': 'application/json'} if body else {})
    with urllib.request.urlopen(req, timeout=60) as r: return json.loads(r.read())


def main():
    check = '--check' in sys.argv
    limit = int(sys.argv[sys.argv.index('--limit') + 1]) if '--limit' in sys.argv else None
    try:
        names = {v['name'] for lang in ('en-US', 'en-GB', 'en-AU') for v in call(f'/voices?languageCode={lang}')['voices']}
    except urllib.error.HTTPError as e:
        sys.exit(f'API 연결 실패: HTTP {e.code} {e.read()[:300]!r}')
    need = {NARRATOR} | {v for a in VOICES.values() for g in a.values() for v in g}
    missing = sorted(need - names)
    print('사용할 음성', len(need), '개 · 없는 음성:', missing or '없음')
    if missing: sys.exit('VOICES 표의 음성 이름을 실제 목록에 맞게 고치세요.')
    voice_map, jobs = plan()
    print('클립', len(jobs), '개 · 문자', sum(len(t) for _, t in jobs.values()))
    if check: return
    OUT.mkdir(parents=True, exist_ok=True)
    todo = [(k, v, t) for k, (v, t) in jobs.items() if not (OUT / f'{k}.mp3').exists()]
    if limit: todo = todo[:limit]
    for i, (k, v, t) in enumerate(todo, 1):
        body = {'input': {'text': t}, 'voice': {'languageCode': v[:5], 'name': v},
                'audioConfig': {'audioEncoding': 'MP3', 'sampleRateHertz': 24000, 'speakingRate': 1.0}}
        for attempt in range(4):
            try:
                (OUT / f'{k}.mp3').write_bytes(base64.b64decode(call('/text:synthesize', body)['audioContent'])); break
            except urllib.error.HTTPError as e:
                if e.code in (429, 500, 503) and attempt < 3: time.sleep(2 ** attempt); continue
                sys.exit(f'{k} 실패: HTTP {e.code} {e.read()[:200]!r}')
        if i % 50 == 0: print(f'  {i}/{len(todo)}')
    have = sorted(p.stem for p in OUT.glob('*.mp3'))
    (ROOT / 'data-audio.js').write_text(
        '/* LC 음성 파일 목록 (scripts/make-lc-audio.py가 만든 파일). 직접 고치지 마세요. */\n'
        f'const LC_AUDIO={{voices:{json.dumps(voice_map, separators=(",", ":"))},files:{json.dumps([h for h in have if h in jobs], separators=(",", ":"))}}};\n'
        "if (typeof module !== 'undefined') module.exports = LC_AUDIO;\n", encoding='utf8')
    print('완료: 새로 만든 파일', len(todo), '개 · 전체', len(have), '개')


if __name__ == '__main__':
    main()
