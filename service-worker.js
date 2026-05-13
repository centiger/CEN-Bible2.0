const CACHE_NAME = 'cen-bible-2-0-soft-overview-20260513';
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./overview66/manifest.json",
  "./overview66/data/books.json",
  "./overview66/index.html",
  "./data/books.json",
  "./data/bible-overview.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const accept = req.headers.get("accept") || "";
  const isHTML = req.mode === "navigate" || accept.includes("text/html");

  if (isHTML) {
    event.respondWith(
      fetch(req, { cache: "no-store" })
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      return cached || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      });
    })
  );
});

// CEN_BIBLE_2_0_JSON_FINAL_1778334331

// USER_UPLOADED_BOOKS_JSON_1778335550

// CEN_BIBLE_2_0_OVERVIEW66_MODULE_1778336522

// OVERVIEW66_CLICK_FIXED_1778339097

// ORIGINAL_IMAGE_FALLBACK_FIX_1778340348

// ORIGINAL_FILENAME_XX_ENGLISH_FIX_1778341213

// UI_MEMORY_VERSE_FIX_1778342428

// ICON_VERSE_CLEAN_FIX_1778343405

// FASTLOAD_EXTERNAL_DATA_1778343807

// MEMORY_RELATED_ICON_VERSE_FORMAT_FIX_1778344354

// VIEWER_ZOOM_ICONS_VERSE_FORMAT_1778344737

// COLOR_ICONS_FAST_START_1778345585

// DIVINE_ICON_VIEWER_FIX_1778346414

// BIBLE_ICON_VIEWER_FINAL_1778347075
