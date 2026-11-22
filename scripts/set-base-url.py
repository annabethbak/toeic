#!/usr/bin/env python3
"""사이트 주소(canonical, og:url, sitemap, robots)를 한 번에 바꾼다.
사용법: python3 scripts/set-base-url.py https://새도메인
현재 주소는 아래 BASE_URL 한 곳에 기록되며, 실행하면 이 값도 함께 바뀐다."""
import sys, pathlib
BASE_URL = "https://english800.kr"   # TODO: 실제 도메인이 다르면 이 스크립트로 바꾸세요
new = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else sys.exit(__doc__)
root = pathlib.Path(__file__).resolve().parent.parent
n = 0
for f in [*root.glob('*.html'), *root.glob('guide/*.html'), root/'sitemap.xml', root/'robots.txt']:
    s = f.read_text(encoding='utf8')
    if BASE_URL in s:
        f.write_text(s.replace(BASE_URL, new), encoding='utf8'); n += 1
me = pathlib.Path(__file__); me.write_text(me.read_text(encoding='utf8').replace(f'BASE_URL = "{BASE_URL}"', f'BASE_URL = "{new}"', 1), encoding='utf8')
print(f'{n}개 파일을 {new} 로 바꿨습니다.')
