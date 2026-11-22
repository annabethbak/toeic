#!/usr/bin/env python3
"""assets/site.css, assets/ads.js 를 고친 뒤 실행하세요.
각 파일 내용으로 버전(?v=…)을 만들어 모든 페이지의 링크에 붙입니다.
브라우저가 예전 파일을 캐시에서 계속 쓰는 문제를 막습니다."""
import hashlib, pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
ver = {f: hashlib.sha1((root/'assets'/f).read_bytes()).hexdigest()[:8] for f in ('site.css', 'ads.js')}
n = 0
for page in [*root.glob('*.html'), *root.glob('guide/*.html')]:
    s = page.read_text(encoding='utf8'); t = s
    for f, v in ver.items():
        t = re.sub(r'(assets/' + re.escape(f) + r')(\?v=[0-9a-f]+)?"', r'\1?v=' + v + '"', t)
    if t != s: page.write_text(t, encoding='utf8'); n += 1
print(f'{n}개 페이지 갱신:', ver)
