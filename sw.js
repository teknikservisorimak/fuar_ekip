/* ORİMAK Fuar CRM — çevrimdışı önbellek
   Kendi dosyalarımız her açılışta önce internetten denenir (güncellemeler hemen gelir),
   internet yoksa önbellekteki son sürüm açılır. Firebase, Tesseract, PDF aracı ve
   yazı tipleri ilk yüklemeden sonra önbellekten gelir. */
const CACHE = "fuar-crm-v4";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "teklif-sablon.js"];
const RUNTIME_HOSTS = ["cdnjs.cloudflare.com", "www.gstatic.com", "cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com", "tessdata.projectnaptha.com"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Kendi dosyalarımız: önce ağ, olmazsa önbellek
  if (url.origin === location.origin) {
    const key = url.pathname.endsWith("/") ? new Request(url.origin + url.pathname + "index.html") : new Request(url.origin + url.pathname);
    e.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)); }
        return res;
      }).catch(() => caches.match(key).then(r => r || caches.match(req, { ignoreSearch: true })))
    );
    return;
  }
  // Kütüphaneler ve yazı tipleri: önce önbellek
  if (RUNTIME_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
