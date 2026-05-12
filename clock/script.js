/**
 * 篠ノ井乗務区 総合ポータル - PR & Menu Edition
 * Version: 2.7.0 "Shinonoi-PR-Master"
 */

// --- 1. スタイル設定 ---
const style = document.createElement('style');
style.textContent = `
    body {
        margin: 0; padding: 0;
        font-family: 'Helvetica Neue', Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", sans-serif;
        background: linear-gradient(-45deg, #0d1b2a, #1b263b, #415a77, #1b263b);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        color: #e0e1dd;
        display: flex; justify-content: center; align-items: center;
        min-height: 100vh; overflow-x: hidden;
    }
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    /* ハンバーガーメニュー */
    .menu-btn {
        position: fixed; top: 20px; right: 20px;
        z-index: 1000; width: 40px; height: 40px;
        cursor: pointer; display: flex; flex-direction: column; justify-content: space-around;
        background: rgba(255,255,255,0.1); padding: 8px; border-radius: 8px;
    }
    .menu-btn span {
        display: block; width: 100%; height: 2px; background: #fff; transition: 0.3s;
    }
    .menu-btn.open span:nth-child(1) { transform: translateY(11px) rotate(45deg); }
    .menu-btn.open span:nth-child(2) { opacity: 0; }
    .menu-btn.open span:nth-child(3) { transform: translateY(-11px) rotate(-45deg); }

    .nav-menu {
        position: fixed; top: 0; right: -100%; width: 280px; height: 100%;
        background: rgba(13, 27, 42, 0.95); backdrop-filter: blur(10px);
        z-index: 999; transition: 0.4s; padding: 80px 20px;
        box-shadow: -10px 0 30px rgba(0,0,0,0.5);
    }
    .nav-menu.open { right: 0; }
    .nav-menu a {
        display: block; color: #fff; text-decoration: none; padding: 15px;
        font-size: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);
        transition: 0.3s;
    }
    .nav-menu a:hover { background: rgba(255,255,255,0.1); color: #00d4ff; }
    .menu-desc { font-size: 0.7rem; color: #888; display: block; margin-top: 5px; }

    /* メインコンテンツ */
    .container {
        width: 90%; max-width: 800px; text-align: center;
        background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 30px;
        padding: clamp(40px, 10vw, 80px) 20px;
    }

    .pr-badge {
        display: inline-block; background: #00d4ff; color: #000;
        font-size: 0.7rem; font-weight: bold; padding: 4px 12px;
        border-radius: 20px; margin-bottom: 15px; letter-spacing: 1px;
    }

    .main-clock {
        font-size: clamp(3.5rem, 18vw, 8rem); font-weight: 200;
        line-height: 1; margin: 10px 0;
    }

    .catchphrase {
        font-size: clamp(1rem, 4vw, 1.5rem); font-weight: 300;
        margin: 20px 0; color: #fff; opacity: 0.9;
    }

    .coming-soon-tag {
        display: inline-block; border: 1px solid #ff4d6d; color: #ff4d6d;
        font-size: 0.7rem; padding: 5px 15px; border-radius: 5px;
        margin-top: 30px; animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; }
    }

    .version { font-size: 0.65rem; color: #444; margin-top: 40px; }
`;
document.head.appendChild(style);

// --- 2. HTML構造 ---
document.body.innerHTML = `
    <div id="menuBtn" class="menu-btn"><span></span><span></span><span></span></div>
    
    <nav id="navMenu" class="nav-menu">
        <div style="font-size:0.8rem; color:#00d4ff; margin-bottom:20px; font-weight:bold;">CONTENTS MENU</div>
        <a href="https://shinorail.github.io/">
            総合トップページ
            <span class="menu-desc">篠ノ井乗務区の全容はこちらから</span>
        </a>
        <a href="https://shinorail.github.io/links.html">
            公式リンク集
            <span class="menu-desc">関連サイトへのクイックアクセス</span>
        </a>
        <a href="https://shinorail.github.io/main/">
            活動記録
            <span class="menu-desc">日々の制作・活動内容を公開中</span>
        </a>
        <div style="margin-top:30px; padding:15px; font-size:0.7rem; color:#555; border-top:1px solid #222;">
            Shinonoi Rail Executive System
        </div>
    </nav>

    <div class="container">
        <div class="pr-badge">OFFICIAL PORTAL</div>
        <div style="font-size:1.2rem; font-weight:bold; letter-spacing:8px;">篠ノ井乗務区</div>
        
        <div id="clock" class="main-clock">00:00:00</div>
        <div id="date" style="font-size:1.1rem; opacity:0.6;">----/--/--</div>
        
        <div class="catchphrase">
            信州の鼓動を、正確な時とともに。<br>
            <span style="font-size:0.8rem; opacity:0.7;">篠ノ井乗務区は鉄道文化の魅力を発信し続けます。</span>
        </div>

        <div class="coming-soon-tag">COMING SOON: 新システム開発中</div>
        
        <div class="version">Ver 2.7.0 | Produced by Shinonoi Rail</div>
    </div>
`;

// --- 3. JavaScript ロジック ---

// メニュー開閉
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
menuBtn.onclick = () => {
    menuBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
};

// 画面外クリックでメニューを閉じる
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBtn.classList.remove('open');
        navMenu.classList.remove('open');
    }
});

function update() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('ja-JP', { hour12: false });
    document.getElementById('date').textContent = now.toLocaleDateString('ja-JP', { 
        year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' 
    });
    requestAnimationFrame(update);
}

update();
