
const CACHE_NAME = "cen-bible-chronology-v11-soft-overview";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/chronology-data.js",
  "./js/app.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/infographics/01_creation.png",
  "./assets/infographics/02_adam_eve.png",
  "./assets/infographics/03_eden_exile.png",
  "./assets/infographics/04_cain_abel.png",
  "./assets/infographics/05_noah_ark.png",
  "./assets/infographics/06_babel_tower.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
