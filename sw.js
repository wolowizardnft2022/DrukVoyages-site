/* Druk Voyages service worker (R-24, T132): faster repeat visits and a working site when the connection drops.
   - Pages: network first (always the newest page when online); the cached copy, or the cached home page, when offline.
   - Scripts, styles and language files: served from the cache at once and refreshed in the background.
     Their URLs carry a version (?v=…), so a site update fetches new files rather than reusing old ones.
   - Images: cache first (they rarely change), at most MAX_IMAGES kept; team avatars are refreshed in the background.
   - Never cached: the API (enquiries, chat, guest stories), /health, other sites (Google Fonts keep the browser cache).
   Bump VERSION to drop every cached file on the next visit. To switch the worker off, open any page with ?nosw. */
'use strict';

const VERSION = '20261114-4';
const BASE = new URL('./', self.location.href).pathname;
const PAGES = `druk-pages-${VERSION}`;
const ASSETS = `druk-assets-${VERSION}`;
const IMAGES = `druk-images-${VERSION}`;
const MAX_IMAGES = 150;
const PAGE_TIMEOUT = 4000; // on a slow connection, show the cached page after this and update it in the background

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PAGES)
      .then(cache => cache.add(new Request(BASE, { cache: 'reload' })))
      .catch(() => {}) // offline during install: the home page is cached on the first visit instead
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('druk-') && ![PAGES, ASSETS, IMAGES].includes(key)).map(key => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

const cacheable = response => response && response.ok && response.status === 200 && response.type === 'basic';

async function put(cacheName, request, response) {
  if (!cacheable(response)) return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
  if (cacheName === IMAGES) {
    const keys = await cache.keys();
    await Promise.all(keys.slice(0, Math.max(0, keys.length - MAX_IMAGES)).map(key => cache.delete(key)));
  }
}

async function networkFirst(event) {
  const { request } = event;
  const network = fetch(request).then(response => {
    event.waitUntil(put(PAGES, request, response.clone()));
    return response;
  });
  event.waitUntil(network.catch(() => {}));
  const timeout = new Promise(resolve => setTimeout(resolve, PAGE_TIMEOUT));
  try {
    const response = await Promise.race([network, timeout.then(() => caches.match(request, { cacheName: PAGES }))]);
    if (response) return response;
    return await network;
  } catch {
    return (await caches.match(request, { cacheName: PAGES })) || (await caches.match(BASE, { cacheName: PAGES })) ||
      new Response('You are offline. Please reconnect and try again.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

async function staleWhileRevalidate(event, cacheName) {
  const { request } = event;
  const cached = await caches.match(request, { cacheName });
  const network = fetch(request).then(response => {
    event.waitUntil(put(cacheName, request, response.clone()));
    return response;
  });
  event.waitUntil(network.catch(() => {}));
  return cached || network;
}

async function cacheFirst(event) {
  const { request } = event;
  const cached = await caches.match(request, { cacheName: IMAGES });
  if (cached) return cached;
  const response = await fetch(request);
  event.waitUntil(put(IMAGES, request, response.clone()));
  return response;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || request.headers.has('range')) return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith(BASE + 'api/') || url.pathname === BASE + 'health' || url.pathname === BASE + 'sw.js' || url.pathname.startsWith(BASE + 'brochures/')) return;
  if (request.mode === 'navigate') { event.respondWith(networkFirst(event)); return; }
  if (url.pathname.startsWith(BASE + 'img/team/')) { event.respondWith(staleWhileRevalidate(event, IMAGES)); return; }
  if ((url.pathname.startsWith(BASE + 'img/') || url.pathname.startsWith(BASE + 'ICON/'))) { event.respondWith(cacheFirst(event)); return; }
  if (/\.(?:js|css|json|svg)$/.test(url.pathname)) { event.respondWith(staleWhileRevalidate(event, ASSETS)); }
});
