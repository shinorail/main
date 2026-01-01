document.addEventListener("DOMContentLoaded", function() {
    // ヘッダーの挿入
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = `
            <div class="header-inner">
                <h1>篠ノ井乗務区 公式サイト</h1>
            </div>
        `;
    }

    // ナビゲーション（メニュー）の挿入
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

    // フッターの挿入
    const footer = document.querySelector('footer');
    if (footer) {
        const year = new Date().getFullYear();
        footer.innerHTML = `
            <div class="footer-inner">
                <p>&copy; 2024-${year} 篠ノ井乗務区 All Rights Reserved.</p>
                <p style="font-size: 0.8em; margin-top: 5px;">おかげさまで設立2周年</p>
            </div>
        `;
    }

    // アクティブページの強調表示
    const links = document.querySelectorAll('nav a');
    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentFile) {
            link.classList.add('active');
        }
    });
});
