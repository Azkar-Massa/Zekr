const CACHE_NAME = 'zekr-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/1.mp3',
  '/2.mp3',
  '/3.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});