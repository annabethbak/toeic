/* English800 서비스 워커: 인터넷이 끊겨도 앱과 가이드를 열 수 있게 한다.
   - 페이지(HTML): 네트워크 우선. 새 버전이 있으면 바로 받고, 오프라인이면 저장해 둔 사본을 연다.
   - 스크립트·스타일·문항 데이터·아이콘: 저장해 둔 사본을 먼저 쓰고 뒤에서 새 버전으로 갱신한다.
     (페이지가 ?v=해시로 파일을 부르므로, 파일이 바뀌면 새 주소로 다시 받는다.)
   - 광고(AdSense)와 그 밖의 외부 요청은 건드리지 않는다. Google Fonts만 저장해 둔다.
   파일 목록이나 동작을 바꾸면 VERSION을 올린다. */
const VERSION = 'e800-v5';
const CORE = [
  '/', '/index.html', '/offline.html',
  '/assets/site.css', '/assets/ads.js',
  '/study-core.js', '/data-meta.js', '/data-words.js', '/data-lc.js', '/data-audio.js', '/rc.json',
  '/favicon.svg', '/favicon.ico', '/icon-192.png', '/site.webmanifest',
  '/guide/index.html', '/about.html', '/privacy.html', '/contact.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('e800-') && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function fromCache(req) {
  return caches.match(req).then(hit => hit || caches.match(req, { ignoreSearch: true }));
}

function staleWhileRevalidate(e, req) {
  const net = fetch(req).then(res => {
    if (res && (res.ok || res.type === 'opaque')) {
      const copy = res.clone();
      e.waitUntil(caches.open(VERSION).then(c => c.put(req, copy)));
    }
    return res;
  });
  e.waitUntil(net.catch(() => {}));
  return fromCache(req).then(hit => hit || net);
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin !== self.location.origin) {
    if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
      e.respondWith(staleWhileRevalidate(e, req));
    }
    return; // 광고 등 다른 외부 요청은 브라우저 기본 동작
  }

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); e.waitUntil(caches.open(VERSION).then(c => c.put(req, copy))); }
        return res;
      }).catch(() => fromCache(req).then(hit => hit || caches.match('/offline.html')))
    );
    return;
  }

  e.respondWith(staleWhileRevalidate(e, req));
});
