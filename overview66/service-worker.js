const CACHE_NAME = 'cen-bible-2-0-soft-overview-20260513';
const ASSETS=['./','./index.html','./manifest.json','./data/books.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});

// FORCE_REFRESH_1778327058.1581178

// ACTS_UPDATE_1778327685

// PAULINE_UPDATE_1778328579

// NT_COMPLETE_UPDATE_1778329511

// CEN_BIBLE_2_0_INTEGRATED_1778330337

// ORIGINAL_IMAGE_FALLBACK_FIX_1778340348

// ORIGINAL_FILENAME_XX_ENGLISH_FIX_1778341213

// UI_MEMORY_VERSE_FIX_1778342428

// ICON_VERSE_CLEAN_FIX_1778343405

// FASTLOAD_PARENT_UPDATE_1778343807

// MEMORY_RELATED_ICON_VERSE_FORMAT_FIX_1778344354

// VIEWER_ZOOM_ICONS_VERSE_FORMAT_1778344737

// COLOR_ICONS_FAST_START_1778345585

// DIVINE_ICON_VIEWER_FIX_1778346414

// BIBLE_ICON_VIEWER_FINAL_1778347075
