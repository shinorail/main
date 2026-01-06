document.addEventListener("DOMContentLoaded", function() {
    // 1. 季節判定とボディクラス付与
    const month = new Date().getMonth() + 1;
    let seasonClass = 'winter';
    if (month >= 3 && month <= 5) seasonClass = 'spring';
    else if (month >= 6 && month <= 8) seasonClass = 'summer';
    else if (month >= 9 && month <= 11) seasonClass = 'autumn';
    document.body.classList.add(seasonClass);

    // 2. スタンプの自動記録（規約同意済みの場合のみ）
    if (localStorage.getItem('stamp_agreed') === 'true') {
        const pagesMap = {
            'index.html': 'index',
            'news.html': 'news',
            'train-news.html': 'train-news',
            'renkei.html': 'renkei'
        };
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        if (pagesMap[currentPath]) {
            let history = JSON.parse(localStorage.getItem('stampHistory') || '{}');
            history[pagesMap[currentPath]] = true;
            localStorage.setItem('stampHistory', JSON.stringify(history));
        }
    }

    // 3. ヘッダー
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = `
            <div class="header-inner">
                <h1>篠ノ井乗務区 公式サイト</h1>
            </div>
        `;
    }

    // 4. ナビゲーション（乗車印帳を追加）
    const nav = document.querySelector('nav');
    if (nav) {
        nav.innerHTML = `
            <ul>
                <li><a href="index.html">ホーム</a></li>
                <li><a href="news.html">お知らせ</a></li>
                <li><a href="train-news.html">Train-News</a></li>
                <li><a href="mission.html">活動理念</a></li>
                <li><a href="photo.html">写真記録</a></li>
                <li><a href="stamp.html" style="color: #e63946; font-weight: bold;">乗車印帳</a></li>
                <li><a href="contact.html">お問い合わせ</a></li>
                <li><a href="faq.html">よくある質問</a></li>
                <li><a href="links.html">SNS/外部リンク</a></li>
                <li><a href="renkei.html" style="color: #ffcc00; font-weight: bold;">連携パーツ配布</a></li>
            </ul>
        `;
    }

    // 5. フッター
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
            <div class="footer-inner" style="text-align: center; padding: 20px; font-size: 0.9em; line-height: 1.8; color: #555; border-top: 1px solid #ddd;">
                <p>当サイトでは、Google Geminiなどの生成AI技術を活用し、サービスの品質向上に努めております。</p>
                <p>お問い合わせは以下のフォームよりお願いいたします。<br>
                <a href="contact.html" style="color: #004da0; font-weight: bold; text-decoration: underline;">お問い合わせフォーム</a></p>
                <div style="margin: 20px 0;">
                    <a href="policy.html" style="color:#666; text-decoration:none; margin: 0 10px;">規約・ポリシー</a>
                    <a href="renkei.html" style="color:#004da0; text-decoration:none; margin: 0 10px; font-weight:bold;">公式連携パーツ配布中</a>
                </div>
                <p style="font-weight: bold; margin-bottom: 5px;">運営：篠ノ井乗務区</p>
                <p style="margin: 0;">&copy; 2026 篠ノ井乗務区 All Rights Reserved.</p>
                <p style="font-size: 0.8em; color: #888;">本サイトに掲載の文章・画像・データの無断転載を禁じます。</p>
            </div>
        `;
    }

    // 6. お知らせ取得（index.html用）
    const topNewsContainer = document.getElementById('top-news-list');
    if (topNewsContainer) {
        loadTopNews(topNewsContainer);
    }
});

async function loadTopNews(container) {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwbUTBxVeTkRlAJ1dnBlgcmpGaWI9B0SeMwkwKSwAJYjRDAtVcX67QwA5FcNGaJE9Cq/exec";
    const loadingMsg = document.getElementById('news-loading');

    try {
        const response = await fetch(scriptUrl + "?sheet=お知らせ");
        const data = await response.json();
        
        if (loadingMsg) loadingMsg.style.display = 'none';
        container.innerHTML = "";

        if (!data || data.length === 0) {
            container.innerHTML = "<li>現在、新しいお知らせはありません。</li>";
            return;
        }

        data.reverse().slice(0, 3).forEach(item => {
            const li = document.createElement('li');
            li.style.cssText = "padding: 10px 0; border-bottom: 1px dashed #eee; display: flex; gap: 15px; font-size: 0.95em; text-align: left;";
            li.innerHTML = `
                <span style="color: #666; font-family: monospace; white-space: nowrap;">${item.日付 || ""}</span>
                <span style="background: #004da0; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.75em; height: fit-content;">${item.カテゴリ || "一般"}</span>
                <span>${item.内容 || ""}</span>
            `;
            container.appendChild(li);
        });
    } catch (e) {
        if (loadingMsg) loadingMsg.innerText = "お知らせの取得に失敗しました。";
    }
}
