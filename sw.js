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

// インストール
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// 有効化（古いキャッシュ削除）
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// フェッチ制御
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // 外部POST（アンケート等）はSW無関与
  if (event.request.method !== "GET") return;
  if (url.hostname.includes("script.google.com")) return;

  // HTMLナビゲーション
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // 静的ファイル
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
