#!/usr/bin/env python3
"""assets/site.css, assets/ads.js, 데이터·로직 파일(data-*.js, study-core.js, rc.json)을 고친 뒤 실행하세요.
각 파일 내용으로 버전(?v=…)을 만들어 모든 페이지의 링크에 붙입니다.
브라우저가 예전 파일을 캐시에서 계속 쓰는 문제(예: 새 화면 + 옛 문제 데이터)를 막습니다."""
import hashlib, pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
h = lambda p: hashlib.sha1(p.read_bytes()).hexdigest()[:8]
ver = {'assets/'+f: h(root/'assets'/f) for f in ('site.css', 'ads.js')}
for f in ('data-words.js', 'data-lc.js', 'data-meta.js', 'study-core.js', 'rc.json'):
    if (root/f).exists(): ver[f] = h(root/f)
n = 0
for page in [*root.glob('*.html'), *root.glob('guide/*.html')]:
    s = page.read_text(encoding='utf8'); t = s
    for f, v in ver.items():
        # 상대 경로(../assets/…)와 rc.json fetch('rc.json?v=…') 모두 처리. 다른 파일 이름의 일부와는 맞추지 않는다.
        t = re.sub(r'((?<![\w./-])(?:\.\./)?' + re.escape(f) + r')(\?v=[0-9a-f]+)?(["\'])', r'\1?v=' + v + r'\3', t)
    if t != s: page.write_text(t, encoding='utf8'); n += 1
print(f'{n}개 페이지 갱신:', ver)
