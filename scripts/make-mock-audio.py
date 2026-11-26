#!/usr/bin/env python3
"""모의고사 LC 음성 파일 만들기 (Google Cloud Text-to-Speech).

사용법:  python3 scripts/make-mock-audio.py [--check]
- 읽을 문장과 보기 순서는 data-mock.js의 mockAudioLines()가 정한다(화면과 같은 순서).
- 화자마다 미국·영국·호주 억양을 돌아가며 배정하고, 한 재생 안에서 두 화자는 서로 다른 억양을 쓴다.
- API 키는 넣지 않는다. 작업 환경의 Network secret(X-Goog-Api-Key)으로 프록시가 붙여 보낸다.
- 결과: audio/mock/<해시>.mp3, data-mock-audio.js ({재생 id: [파일 해시, ...]}). 이미 있는 파일은 건너뛴다.
"""
import base64, importlib.util, json, pathlib, subprocess, sys, time, urllib.error

ROOT = pathlib.Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('lc', ROOT / 'scripts' / 'make-lc-audio.py')
lc = importlib.util.module_from_spec(spec); spec.loader.exec_module(lc)
OUT = ROOT / 'audio' / 'mock'


def load():
    code = "const m=require(process.argv[1]);process.stdout.write(JSON.stringify(m.mockAudioLines()))"
    return json.loads(subprocess.run(['node', '-e', code, str(ROOT / 'data-mock.js')], capture_output=True, text=True, check=True).stdout)


def plan():
    lines = load(); play, jobs = {}, {}
    for n, (pid, ls) in enumerate(lines.items()):
        vm, used, k = {}, set(), 0
        for sp, text, g in ls:
            if sp == 'N' and not pid.startswith('p1'):
                v = lc.NARRATOR
            else:
                if sp not in vm:
                    acc = lc.ACCENTS[(n + k) % 3]; k += 1
                    cand = [x for x in lc.VOICES[acc][g] if x not in used] or lc.VOICES[acc][g]
                    vm[sp] = cand[0]; used.add(cand[0])
                v = vm[sp]
            h = lc.clip_id(v, text); jobs[h] = (v, text); play.setdefault(pid, []).append(h)
    return play, jobs


def main():
    play, jobs = plan()
    print('재생', len(play), '개 · 클립', len(jobs), '개 · 문자', sum(len(t) for _, t in jobs.values()))
    if '--check' in sys.argv: return
    OUT.mkdir(parents=True, exist_ok=True)
    todo = [(h, v, t) for h, (v, t) in jobs.items() if not (OUT / f'{h}.mp3').exists()]
    for i, (h, v, t) in enumerate(todo, 1):
        body = {'input': {'text': t}, 'voice': {'languageCode': v[:5], 'name': v},
                'audioConfig': {'audioEncoding': 'MP3', 'sampleRateHertz': 24000, 'speakingRate': 1.0}}
        for attempt in range(4):
            try:
                (OUT / f'{h}.mp3').write_bytes(base64.b64decode(lc.call('/text:synthesize', body)['audioContent'])); break
            except urllib.error.HTTPError as e:
                if e.code in (429, 500, 503) and attempt < 3: time.sleep(2 ** attempt); continue
                sys.exit(f'{h} 실패: HTTP {e.code} {e.read()[:200]!r}')
        if i % 25 == 0: print(f'  {i}/{len(todo)}')
    missing = [h for h in jobs if not (OUT / f'{h}.mp3').exists()]
    if missing: sys.exit(f'없는 파일 {len(missing)}개')
    (ROOT / 'data-mock-audio.js').write_text(
        '/* 모의고사 LC 음성 파일 목록 (scripts/make-mock-audio.py가 만든 파일). 직접 고치지 마세요. */\n'
        f'const MOCK_AUDIO={json.dumps(play, separators=(",", ":"))};\n'
        "if (typeof module !== 'undefined') module.exports = MOCK_AUDIO;\n", encoding='utf8')
    print('완료: 새로 만든 파일', len(todo), '개 · 전체', len(jobs), '개')


if __name__ == '__main__':
    main()
