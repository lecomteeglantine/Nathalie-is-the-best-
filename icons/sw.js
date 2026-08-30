/* Nathalie EN · Service Worker V12 · audited 2026-08-30 */
const CACHE_VERSION = 'nathalie-v12-audit-2026-08-30';
const CORE = [
  './',
  './index.html',
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
    // All local app-shell files are required for a valid offline install.
    await cache.addAll(CORE);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key.startsWith('nathalie-') && key !== CACHE_VERSION)
        .map(key => caches.delete(key))
    );
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

  // YouTube and all other third-party resources remain network-only.
  if (url.origin !== self.location.origin) {
    event.respondWith(fetch(req));
    return;
  }

  // App navigations: network first so GitHub updates arrive promptly,
  // with the cached application shell as the offline fallback.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_VERSION);
          cache.put('./index.html', fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch (err) {
        return (await caches.match('./index.html')) ||
          (await caches.match('./')) ||
          new Response(
            '<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nathalie EN · hors ligne</title><body style="font-family:system-ui;padding:2rem;line-height:1.5"><h1>Mode hors connexion</h1><p>Cette page n’a pas encore été mise en cache. Reviens une fois avec une connexion internet, puis l’application pourra fonctionner hors ligne.</p></body></html>',
            {headers:{'Content-Type':'text/html; charset=utf-8'}}
          );
      }
    })());
    return;
  }

  // Same-origin assets: serve cache immediately, refresh in background.
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
