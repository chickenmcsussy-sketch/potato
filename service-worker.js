const CACHE_NAME = "valentine-v2";
const OFFLINE_URL = "./offline.html";

const FILES_TO_CACHE = [
  "/potato/",
  "/potato/index.html",
  "/potato/style.css",
  "/potato/script.js",
  "/potato/manifest.json",
  "/potato/offline.html",
  "/potato/icon-192.png",
  "/potato/icon-512.png",
  "/potato/cat1.gif",
  "/potato/cat2.gif",
  "/potato/penguin.jpg",
  "/potato/photobooth.jpg",
  "/potato/photobooth2.jpg",
  "/potato/firstdate.jpg",
  "/potato/froggy.jpg",
  "/potato/USS.jpg"
];


// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(res => res || caches.match(OFFLINE_URL))
    )
  );
});

