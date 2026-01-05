const CACHE_NAME = "shinorail-v3";
const OFFLINE_URL = "offline.html";

const STATIC_ASSETS = [
  "./",
  "index.html",
  "style.css",
  "menu.js",
  "offline.html",
  "icon-192.png",
  "icon-512.png"
];

/* =========================
   インストール
========================= */
self.addEventListener("install", event => {
  // 新SWを即待機解除（更新通知前提）
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

/* =========================
   有効化
========================= */
self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      // 古いキャッシュ削除
      caches.keys().then(keys =>
        Promise.all(
          keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
        )
      ),
      // 全クライアント制御
      self.clients.claim()
    ])
  );
});

/* =========================
   フェッチ制御
========================= */
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // POSTや外部APIはSW非介入
  if (event.request.method !== "GET") return;
  if (url.hostname.includes("script.google.com")) return;

  // HTMLナビゲーション（オフライン対応）
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // 最新HTMLをキャッシュ更新
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache =>
            cache.put(event.request, copy)
          );
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // 静的リソース
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache =>
          cache.put(event.request, copy)
        );
        return response;
      });
    })
  );
});
