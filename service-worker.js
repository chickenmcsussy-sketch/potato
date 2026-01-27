self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("valentine-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js",
        "./cat1.gif",
        "./cat2.gif",
        "./penguin.jpg"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
