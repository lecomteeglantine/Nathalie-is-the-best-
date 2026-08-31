/* Nathalie EN · Service Worker V13.2 · audit fix · 2026-08-31 */
const CACHE_VERSION = 'nathalie-v13-2-auditfix-2026-08-31';

// The HTML shell is essential. Large/secondary assets are best-effort so a
// temporary MP3/icon failure never prevents the whole offline app installing.
const ESSENTIAL = [
  './',
  './index.html',
  './sauvegarde-progression.html',
  './manifest.webmanifest'
];
const OPTIONAL = [
  './assets/nathalie-city-travel-theme.mp3',
  './icons/favicon-32.png',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await Promise.all(ESSENTIAL.map(url => cache.add(url)));
    await Promise.allSettled(OPTIONAL.map(url => cache.add(url)));
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('nathalie-') && key !== CACHE_VERSION)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function navigationCacheKey(req) {
  const url = new URL(req.url);
  if (url.pathname.endsWith('/sauvegarde-progression.html')) {
    return './sauvegarde-progression.html';
  }
  return './index.html';
}

async function cachedAudioRange(req) {
  const range = req.headers.get('range');
  if (!range) return null;
  const fullRequest = new Request(req.url, {method:'GET'});
  const cached = await caches.match(fullRequest);
  if (!cached) return null;
  const match = /^bytes=(\d*)-(\d*)$/i.exec(range.trim());
  if (!match) return cached;
  const buffer = await cached.arrayBuffer();
  const size = buffer.byteLength;
  let start = match[1] ? Number(match[1]) : 0;
  let end = match[2] ? Number(match[2]) : size - 1;
  if (!match[1] && match[2]) {
    const suffix = Math.min(Number(match[2]), size);
    start = size - suffix; end = size - 1;
  }
  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start || start >= size) {
    return new Response(null, {status:416, headers:{'Content-Range':'bytes */'+size}});
  }
  end = Math.min(end, size - 1);
  const headers = new Headers(cached.headers);
  headers.set('Accept-Ranges','bytes');
  headers.set('Content-Range',`bytes ${start}-${end}/${size}`);
  headers.set('Content-Length',String(end-start+1));
  if (!headers.get('Content-Type')) headers.set('Content-Type','audio/mpeg');
  return new Response(buffer.slice(start,end+1), {status:206,statusText:'Partial Content',headers});
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Third-party resources (YouTube, etc.) stay outside our cache.
  if (url.origin !== self.location.origin) return;

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

  // Media players frequently request byte ranges. Serve them from the full
  // cached MP3 when possible, so seeking/looping also works offline.
  if (req.headers.has('range') && /\.mp3$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const partial = await cachedAudioRange(req);
      return partial || fetch(req);
    })());
    return;
  }

  // Same-origin assets: cache first, then refresh silently.
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
