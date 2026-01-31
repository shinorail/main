document.addEventListener('DOMContentLoaded', () => {
    const nav = document.createElement('nav');
    nav.id = 'mobile-nav';
    const isMemoryPage = window.location.pathname.includes('/memory/');

    let menuHtml = '';
    if (isMemoryPage) {
        menuHtml = `
            <a href="index.html" class="nav-link">フォトコンTOP</a>
            <a href="guidelines.html" class="nav-link">公式募集要項</a>
            <a href="gallery.html" class="nav-link">写真館（ギャラリー）</a>
            <a href="mypage.html" class="nav-link">マイページ</a>
            <a href="terms.html" class="nav-link" style="font-size: 0.8rem; color: #ccc;">利用規約・ポリシー</a>
            <a href="../index.html" class="nav-link" style="border-top:1px solid #444; margin-top:10px; color:#aaa;">ポータルに戻る</a>
        `;
    } else {
        menuHtml = `<a href="index.html" class="nav-link">ホーム（ポータル）</a>`;
    }

    nav.innerHTML = menuHtml;
    document.body.appendChild(nav);

    const btn = document.createElement('button');
    btn.className = 'menu-trigger';
    btn.innerText = 'MENU';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        btn.innerText = nav.classList.contains('nav-active') ? 'CLOSE' : 'MENU';
    });
});
