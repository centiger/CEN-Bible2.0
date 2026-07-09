/*
  CEN Bible 2.0 Offline Core v1.0
  목표: 메인 PWA에서 성경 읽기/검색에 필요한 핵심 파일과 성경 압축 데이터를
  설치/첫 실행 시 캐시하여 네트워크가 끊겨도 성경 기능이 작동하도록 한다.
*/
const CACHE_NAME = 'cen-bible-2-0-offline-core-v1-20260709';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './js/chronology-data.js',
  './books.json',
  './bible-overview.json',
  './progress.json',
  './data/books.json',
  './data/bible-overview.json',
  './data/progress.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icon-192.png',
  './icon-512.png',
  './overview66/index.html',
  './overview66/manifest.json'
];

// 성경 읽기/검색의 핵심 데이터. index.html의 VERSION_IDS와 동일하게 유지한다.
const BIBLE_CORE_DATA = [
  './data/compressed/DATA_V0.gz', // 개역개정판
  './data/compressed/DATA_V1.gz', // 개역한글판
  './data/compressed/DATA_V2.gz', // 쉬운성경
  './data/compressed/DATA_V4.gz', // NIV
  './data/compressed/DATA_V5.gz', // KJV
  './data/compressed/DATA_V6.gz', // ESV
  './data/compressed/DATA_HYMNS.gz'
];

const PRECACHE_URLS = APP_SHELL.concat(BIBLE_CORE_DATA);

async function cacheCoreFiles() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(
    PRECACHE_URLS.map(async (url) => {
      try {
        await cache.add(url);
      } catch (err) {
        // 일부 보조 파일이 없어도 설치 전체가 실패하지 않게 한다.
        console.warn('[CEN offline] cache skipped:', url, err);
      }
    })
  );
}

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(cacheCoreFiles());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CEN_CACHE_CORE') {
    event.waitUntil(cacheCoreFiles());
  }
});

function isBibleCoreRequest(req) {
  const url = new URL(req.url);
  return url.pathname.includes('/data/compressed/DATA_') ||
         url.pathname.endsWith('/data/books.json') ||
         url.pathname.endsWith('/books.json');
}

function isSameOrigin(req) {
  try { return new URL(req.url).origin === self.location.origin; }
  catch(e) { return false; }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone());
  return res;
}

async function networkFirstHTML(req) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const res = await fetch(req, { cache: 'no-store' });
    if (res && res.ok) cache.put('./index.html', res.clone());
    return res;
  } catch (err) {
    return (await cache.match('./index.html')) || Response.error();
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req, { ignoreSearch: true });
  const network = fetch(req).then(res => {
    if (res && res.ok && isSameOrigin(req)) cache.put(req, res.clone());
    return res;
  }).catch(() => null);
  return cached || network || Response.error();
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const accept = req.headers.get('accept') || '';
  const isHTML = req.mode === 'navigate' || accept.includes('text/html');

  if (isHTML && isSameOrigin(req)) {
    event.respondWith(networkFirstHTML(req));
    return;
  }

  // 성경 본문/검색 데이터는 오프라인 우선. ?v=fastload 같은 쿼리도 동일 파일로 처리한다.
  if (isSameOrigin(req) && isBibleCoreRequest(req)) {
    event.respondWith(cacheFirst(req));
    return;
  }

  if (isSameOrigin(req)) {
    event.respondWith(staleWhileRevalidate(req));
  }
});
