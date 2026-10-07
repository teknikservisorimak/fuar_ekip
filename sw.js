/* ORİMAK Fuar CRM — çevrimdışı önbellek
   Uygulama sayfası her açılışta önce internetten denenir (güncellemeler hemen gelir),
   internet yoksa önbellekteki son sürüm açılır. Firebase, Tesseract ve yazı tipleri
   ilk yüklemeden sonra önbellekten gelir. */
const CACHE = "fuar-crm-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const RUNTIME_HOSTS = ["www.gstatic.com", "cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com", "tessdata.projectnaptha.com"];

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

  // Uygulama sayfası: önce ağ, olmazsa önbellek
  if (req.mode === "navigate" || (url.origin === location.origin && url.pathname.endsWith(".html"))) {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html").then(r => r || caches.match("./")))
    );
    return;
  }
  // Kendi dosyalarımız ve kütüphaneler: önce önbellek
  if (url.origin === location.origin || RUNTIME_HOSTS.includes(url.hostname)) {
    // Firestore/Auth canlı bağlantıları önbelleğe alınmaz (farklı hostlar, zaten listede yok)
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
