const CACHE_NAME = 'shinorail-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-512.png',
  './icon-192.png',
  './style.css',
  './menu.js'
];

// インストール時に必要なファイルをキャッシュに保存 [cite: 13]
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// リクエスト時にキャッシュがあればそれを返し、なければネットワークから取得 [cite: 14]
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 新しいサービスワーカーへの切り替えを即座に有効化 [cite: 15]
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
