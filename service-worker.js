/*
  CEN Bible 2.0 Offline Core v2.0
  - 성경 핵심 파일이 모두 저장된 경우에만 새 서비스워커를 활성화한다.
  - 저장 실패를 숨기지 않고 기존 정상 캐시를 유지한다.
  - 오프라인 성경 데이터는 cache-first로 제공한다.
*/
const CACHE_NAME = 'cen-bible-2-0-offline-core-v2-20260711';

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

const BIBLE_CORE_DATA = [
  './data/compressed/DATA_V0.gz',
  './data/compressed/DATA_V1.gz',
  './data/compressed/DATA_V2.gz',
  './data/compressed/DATA_V4.gz',
  './data/compressed/DATA_V5.gz',
  './data/compressed/DATA_V6.gz',
  './data/compressed/DATA_HYMNS.gz'
];

const REQUIRED_URLS = ['./index.html', './manifest.json', './data/books.json'].concat(BIBLE_CORE_DATA);
const PRECACHE_URLS = [...new Set(APP_SHELL.concat(BIBLE_CORE_DATA))];

function absolute(url) {
  return new URL(url, self.registration.scope).href;
}

async function cacheOne(cache, url) {
  const req = new Request(url, { cache: 'reload', credentials: 'same-origin' });
  const res = await fetch(req);
  if (!res || !res.ok) throw new Error(`HTTP ${res ? res.status : 'NO_RESPONSE'}: ${url}`);
  await cache.put(url, res.clone());
}

async function verifyCoreCache(cacheName = CACHE_NAME) {
  const cache = await caches.open(cacheName);
  const missing = [];
  for (const url of REQUIRED_URLS) {
    const hit = await cache.match(url, { ignoreSearch: true });
    if (!hit) missing.push(url);
  }
  return { ok: missing.length === 0, missing, cacheName };
}

async function cacheCoreFiles({ strict = true } = {}) {
  const cache = await caches.open(CACHE_NAME);
  const failed = [];

  for (const url of PRECACHE_URLS) {
    try {
      const existing = await cache.match(url, { ignoreSearch: true });
      if (!existing) await cacheOne(cache, url);
    } catch (err) {
      failed.push({ url, error: String(err && err.message || err) });
      if (strict && REQUIRED_URLS.includes(url)) {
        await caches.delete(CACHE_NAME);
        throw new Error(`필수 오프라인 파일 저장 실패: ${url}`);
      }
    }
  }

  const verification = await verifyCoreCache();
  if (!verification.ok && strict) {
    await caches.delete(CACHE_NAME);
    throw new Error(`필수 오프라인 파일 누락: ${verification.missing.join(', ')}`);
  }
  return { ...verification, failed };
}

async function notifyClients(payload) {
  const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  clients.forEach(client => client.postMessage(payload));
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const result = await cacheCoreFiles({ strict: true });
    if (!result.ok) throw new Error('오프라인 성경 핵심 캐시 검증 실패');
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const verified = await verifyCoreCache();
    if (!verified.ok) throw new Error('새 캐시가 완전하지 않아 활성화를 중단합니다.');
    const keys = await caches.keys();
    await Promise.all(keys.map(key => {
      if (key === CACHE_NAME) return null;
      if (key.startsWith('cen-bible-2-0-offline-core-')) return caches.delete(key);
      return null;
    }));
    await self.clients.claim();
    await notifyClients({ type: 'CEN_OFFLINE_READY', detail: verified });
  })());
});

self.addEventListener('message', event => {
  const type = event.data && event.data.type;
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }

  if (type === 'CEN_CACHE_CORE' || type === 'CEN_VERIFY_OFFLINE') {
    event.waitUntil((async () => {
      try {
        const result = type === 'CEN_CACHE_CORE'
          ? await cacheCoreFiles({ strict: true })
          : await verifyCoreCache();
        const payload = { type: 'CEN_OFFLINE_STATUS', ok: result.ok, detail: result };
        if (event.ports && event.ports[0]) event.ports[0].postMessage(payload);
        await notifyClients(payload);
      } catch (err) {
        const payload = { type: 'CEN_OFFLINE_STATUS', ok: false, error: String(err && err.message || err) };
        if (event.ports && event.ports[0]) event.ports[0].postMessage(payload);
        await notifyClients(payload);
      }
    })());
  }
});

function isSameOrigin(req) {
  try { return new URL(req.url).origin === self.location.origin; }
  catch (_) { return false; }
}

function isBibleCoreRequest(req) {
  const url = new URL(req.url);
  return url.pathname.includes('/data/compressed/DATA_') ||
         url.pathname.endsWith('/data/books.json') ||
         url.pathname.endsWith('/books.json');
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req, { ignoreSearch: true });
  if (cached) return cached;
  const res = await fetch(req);
  if (res && res.ok && isSameOrigin(req)) await cache.put(req, res.clone());
  return res;
}

async function navigationFallback(req) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const res = await fetch(req, { cache: 'no-store' });
    if (res && res.ok) await cache.put('./index.html', res.clone());
    return res;
  } catch (_) {
    return (await cache.match(req, { ignoreSearch: true })) ||
           (await cache.match('./index.html', { ignoreSearch: true })) ||
           (await cache.match('./', { ignoreSearch: true })) ||
           new Response('오프라인 성경 앱을 불러오지 못했습니다.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(req, { ignoreSearch: true });
  const network = fetch(req).then(async res => {
    if (res && res.ok && isSameOrigin(req)) await cache.put(req, res.clone());
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
    event.respondWith(navigationFallback(req));
    return;
  }
  if (isSameOrigin(req) && isBibleCoreRequest(req)) {
    event.respondWith(cacheFirst(req));
    return;
  }
  if (isSameOrigin(req)) event.respondWith(staleWhileRevalidate(req));
});
