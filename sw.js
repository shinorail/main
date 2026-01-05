const CACHE_NAME = 'shino-rail-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'menu.js',
  '1.jpg'
];

// インストール時にキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// フェッチ処理
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュがあればそれを返し、なければネットワークへ
      return response || fetch(event.request).catch(() => {
        // ネットワークが失敗（オフライン）かつ、HTMLリクエストの場合にのみメッセージを出す
        if (event.request.mode === 'navigate') {
          return new Response(`
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>オフライン - 篠ノ井乗務区</title>
                <link rel="stylesheet" href="style.css">
              </head>
              <body style="text-align:center; padding:50px; font-family:sans-serif;">
                <img src="1.jpg" alt="Logo" style="width:100px; border-radius:15px; margin-bottom:20px;">
                <h2>オフラインです</h2>
                <p>現在インターネットに接続されていないため、新しい情報を読み込めません。</p>
                <button onclick="window.location.reload()" style="padding:10px 20px; background:#004da0; color:white; border:none; border-radius:5px;">再読み込み</button>
              </body>
            </html>
          `, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
      });
    })
  );
});
