const CACHE = "softly-shell-v1";

// Static public assets worth caching — Next.js JS/CSS has content-hash names
// so we don't try to cache _next/static here; Firestore handles data offline.
const PRECACHE = [
  "/manifest.json",
  "/icons/icon.svg",
  "/icons/icon-maskable.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Let Firebase, APIs, and Next.js internals go straight to network
  if (
    url.hostname !== self.location.hostname ||
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }

  // Navigation: network first, fall back to cached root shell
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match("/") ?? new Response("You're offline. Open Softly when connected.", {
          status: 503,
          headers: { "Content-Type": "text/plain" },
        })
      )
    );
    return;
  }

  // Static public assets: cache first
  event.respondWith(
    caches.match(event.request).then(
      (cached) => cached ?? fetch(event.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, clone));
        }
        return res;
      })
    )
  );
});
