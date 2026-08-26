/* Nathalie EN · Service Worker V8 */
const CACHE_VERSION = 'nathalie-v8-2026-08-26';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/favicon-32.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await Promise.all(CORE.map(url => cache.add(url).catch(() => null)));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('nathalie-') && k !== CACHE_VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Never cache third-party content (YouTube, etc.).
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(req));
    return;
  }

  // Page navigation: network first so GitHub updates arrive immediately;
  // fall back to the last cached application when offline.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE_VERSION);
        cache.put('./index.html', fresh.clone()).catch(() => {});
        return fresh;
      } catch (err) {
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Same-origin assets: cache first, refresh silently in the background.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    const refresh = fetch(req).then(async res => {
      if (res && res.ok) {
        const cache = await caches.open(CACHE_VERSION);
        cache.put(req, res.clone()).catch(() => {});
      }
      return res;
    }).catch(() => null);
    return cached || (await refresh) || Response.error();
  })());
});
