const cacheName = "DefaultCompany-BioLeisureWebAR360-0.03-0.1";
const contentToCache = [
    "Build/BioLeisureWebAR-0.031-elon_musk.loader.js",
    "Build/BioLeisureWebAR-0.031-elon_musk.framework.js",
    "Build/BioLeisureWebAR-0.031-elon_musk.data",
    "Build/BioLeisureWebAR-0.031-elon_musk.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
