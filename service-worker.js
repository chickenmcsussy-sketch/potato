const CACHE_NAME = "valentine-v1";
const OFFLINE_URL = "offline.html";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./offline.html",
  "./icon-192.png",
  "./icon-512.png",
  "./cat1.gif",
  "./cat2.gif",
  "./penguin.jpg"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("fetch", event => {
  // If this is a page navigation
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("offline.html"))
    );
    return;
  }

  // For everything else (images, css, js)
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});


