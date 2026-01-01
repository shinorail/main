document.addEventListener("DOMContentLoaded", function() {
    // 1. ヘッダーの挿入
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = `
            <div class="header-inner">
                <h1>篠ノ井乗務区 公式サイト</h1>
            </div>
        `;
    }

    // 2. ナビゲーション（メニュー）の挿入
    const nav = document.querySelector('nav');
    if (nav) {
        nav.innerHTML = `
            <ul>
                <li><a href="index.html">ホーム</a></li>
                <li><a href="news.html">お知らせ</a></li>
                <li><a href="train-news.html">Train-News</a></li>
                <li><a href="mission.html">活動理念</a></li>
                <li><a href="history.html">沿革</a></li>
                <li><a href="contact.html">問い合わせ</a></li>
            </ul>
        `;
    }

    // 3. フッターの挿入（規約・ポリシーへのリンク付き）
    const footer = document.querySelector('footer');
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `
            <div class="footer-inner">
                <p>
                    <a href="policy.html" style="color:#666; text-decoration:none; margin: 0 10px;">規約・ポリシー</a>
                </p>
                <p>&copy; 2024-${year} 篠ノ井乗務区 All Rights Reserved.</p>
                <p style="font-size: 0.8em; margin-top: 5px;">おかげさまで設立2周年</p>
            </div>
        `;
    }

    // 4. アクティブページの強調表示
    const links = document.querySelectorAll('nav a');
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentFile) {
            link.style.backgroundColor = "rgba(255,255,255,0.1)";
            link.style.borderRadius = "4px";
            link.style.opacity = "1";
        } else {
            link.style.opacity = "0.8";
        }
    });

    // 5. トップページ用：最新のお知らせ自動取得機能
    // index.html に id="top-news-list" がある場合のみ実行
    const topNewsContainer = document.getElementById('top-news-list');
    if (topNewsContainer) {
        loadTopNews(topNewsContainer);
    }
});

/**
 * お知らせデータを取得して表示する関数
 */
async function loadTopNews(container) {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwbUTBxVeTkRlAJ1dnBlgcmpGaWI9B0SeMwkwKSwAJYjRDAtVcX67QwA5FcNGaJE9Cq/exec";
    const loadingMsg = document.getElementById('news-loading');

    try {
        const response = await fetch(scriptUrl);
        const data = await response.json();
        
        if (loadingMsg) loadingMsg.style.display = 'none';

        // 最新の3件を表示
        data.reverse().slice(0, 3).forEach(item => {
            const li = document.createElement('li');
            li.style.cssText = "padding: 10px 0; border-bottom: 1px dashed #eee; display: flex; gap: 15px; font-size: 0.95em;";
            li.innerHTML = `
                <span style="color: #666; font-family: monospace; white-space: nowrap;">${item.日付}</span>
                <span style="background: #004da0; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.75em; height: fit-content;">${item.カテゴリ}</span>
                <span>${item.内容}</span>
            `;
            container.appendChild(li);
        });
    } catch (e) {
        if (loadingMsg) loadingMsg.innerText = "お知らせの取得に失敗しました。";
    }
}
