const CACHE_NAME="pepsico-v6";
const ASSETS=["./","./index.html","./manifest.json"];
self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c=>c.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});
self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.map(k=>
        k!==CACHE_NAME?caches.delete(k):null
      ))
    )
  );
});
self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request)
      .then(r=>r||fetch(e.request).catch(()=>null))
  );
});
