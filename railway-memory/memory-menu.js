document.addEventListener('DOMContentLoaded', () => {
    // メニュー本体のHTMLを生成
    const nav = document.createElement('nav');
    nav.id = 'mobile-nav';
    
    // 現在のページが memory フォルダ内かどうか判定
    const isMemoryPage = window.location.pathname.includes('/memory/');

    let menuHtml = '';
    if (isMemoryPage) {
        // フォトコン専用メニュー
        menuHtml = `
            <a href="index.html" class="nav-link">フォトコンTOP</a>
            <a href="mypage.html" class="nav-link">マイページ</a>
            <a href="gallery.html" class="nav-link">写真館</a>
            <a href="../index.html" class="nav-link" style="border-top:1px solid #444; margin-top:10px; color:#aaa;">ポータルに戻る</a>
        `;
    } else {
        // その他のページ（ホームだけ表示）
        menuHtml = `
            <a href="index.html" class="nav-link">ホーム（ポータル）</a>
        `;
    }

    nav.innerHTML = menuHtml;
    document.body.appendChild(nav);

    // メニューボタン（トリガー）の生成
    const btn = document.createElement('button');
    btn.className = 'menu-trigger';
    btn.innerText = 'MENU';
    document.body.appendChild(btn);

    // 開閉イベント
    btn.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        btn.innerText = nav.classList.contains('nav-active') ? 'CLOSE' : 'MENU';
    });
});
