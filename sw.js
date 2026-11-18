// Service worker: deja la app funcionando sin conexión.
// Si cambiás cualquier archivo, subí el número de CACHE_VERSION para que el iPhone se actualice.
const CACHE_VERSION = "v2";
const CACHE_NAME = `gta6-contador-${CACHE_VERSION}`;

const ASSETS = [
  "./",
  "index.html",
  "css/styles.css",
  "js/app.js",
  "manifest.webmanifest",
  "img/fondo.jpg",
  "img/logo.png",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// Red primero (así siempre ves la última versión) y caché como respaldo offline.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((hit) => hit || caches.match("index.html")))
  );
});
