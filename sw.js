/* Nathalie EN · Service Worker V13 · 2026-08-31 */
const CACHE_VERSION = 'nathalie-v13-2026-08-31';
const CORE = [
  './',
  './index.html',
  './sauvegarde-progression.html',
  './manifest.webmanifest',
  './icons/favicon-32.png',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await cache.addAll(CORE);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('nathalie-') && key !== CACHE_VERSION).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function navigationCacheKey(req) {
  const url = new URL(req.url);
  if (url.pathname.endsWith('/sauvegarde-progression.html')) return './sauvegarde-progression.html';
  return './index.html';
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Third-party resources (YouTube, etc.) remain network-only.
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(req));
    return;
  }

  // HTML navigations: network first; cache each app page under its own key.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const key = navigationCacheKey(req);
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_VERSION);
          cache.put(key, fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch (err) {
        return (await caches.match(key)) ||
          (await caches.match('./index.html')) ||
          (await caches.match('./')) ||
          new Response('<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nathalie EN · hors ligne</title><body style="font-family:system-ui;padding:2rem;line-height:1.5"><h1>Mode hors connexion</h1><p>Cette page n’a pas encore été mise en cache. Reviens une fois avec une connexion internet.</p></body></html>', {headers:{'Content-Type':'text/html; charset=utf-8'}});
      }
    })());
    return;
  }

  // Same-origin assets: cache-first + silent refresh. The Suno MP3 is cached on demand once it exists and is fetched successfully.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    const refresh = fetch(req).then(async res => {
      if (res && res.ok && res.status === 200) {
        const cache = await caches.open(CACHE_VERSION);
        cache.put(req, res.clone()).catch(() => {});
      }
      return res;
    }).catch(() => null);
    return cached || (await refresh) || Response.error();
  })());
});
