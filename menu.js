document.addEventListener("DOMContentLoaded", function() {
    // ヘッダーの生成
    const headerElement = document.querySelector('header');
    if (headerElement) {
        headerElement.innerHTML = `<h1>篠ノ井乗務区 公式サイト</h1>`;
    }

    // ナビゲーションメニューの生成
    const navElement = document.querySelector('nav');
    if (navElement) {
        navElement.innerHTML = `
            <a href="index.html">ホーム</a>
            <a href="news.html">お知らせ</a>
            <a href="train-news.html">Train-News</a>
            <a href="history.html">沿革</a>
            <a href="contact.html">問い合わせ</a>
        `;
    }

    // フッターの生成
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        footerElement.innerHTML = `<p>運営：篠ノ井乗務区 &copy; 2026 All Rights Reserved.</p>`;
    }
});
