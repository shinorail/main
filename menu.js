// menu.js
document.addEventListener("DOMContentLoaded", function() {
    // ヘッダーの生成
    const headerHTML = `
        <h1>篠ノ井乗務区 公式サイト</h1>
    `;
    const headerElement = document.querySelector('header');
    if (headerElement) headerElement.innerHTML = headerHTML;

    // ナビゲーションメニューの生成
    const navHTML = `
        <a href="index.html">ホーム</a>
        <a href="train-news.html">Train-News</a>
        <a href="news.html">お知らせ</a>
        <a href="history.html">沿革</a>
        <a href="contact.html">問い合わせ</a>
    `;
    const navElement = document.querySelector('nav');
    if (navElement) navElement.innerHTML = navHTML;

    // フッターの生成
    const footerHTML = `
        <p>運営：篠ノ井乗務区 &copy; 2026 All Rights Reserved.</p>
    `;
    const footerElement = document.querySelector('footer');
    if (footerElement) footerElement.innerHTML = footerHTML;
});
