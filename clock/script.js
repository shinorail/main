/**
 * 篠ノ井乗務区 総合ポータル - Accessibility & UX Edition
 * Version: 3.0.0 "Shinonoi-Universal-Design"
 */

// --- 1. スタイル設定（アクセシビリティ・UX重視） ---
const style = document.createElement('style');
style.textContent = `
    :root {
        --bg-color: #0d1b2a;
        --card-bg: rgba(255, 255, 255, 0.08);
        --accent-color: #00d4ff;
        --text-main: #ffffff;
        --text-sub: #a0a0a0;
    }

    body {
        margin: 0; padding: 0;
        font-family: system-ui, -apple-system, sans-serif;
        background: var(--bg-color);
        color: var(--text-main);
        display: flex; flex-direction: column;
        min-height: 100vh; overflow-x: hidden;
    }

    /* 背景アニメーション（負荷軽減のため控えめに） */
    .bg-gradient {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: radial-gradient(circle at top right, #1b263b, #0d1b2a);
        z-index: -1;
    }

    /* メインコンテナ：スマホで横幅いっぱい使う */
    .container {
        flex: 1; display: flex; flex-direction: column;
        justify-content: center; align-items: center;
        padding: 20px; box-sizing: border-box;
        width: 100%; max-width: 600px; margin: 0 auto;
    }

    /* 時計：視認性最大化 */
    .clock-wrap { text-align: center; width: 100%; }
    .main-clock {
        font-size: clamp(4.5rem, 25vw, 9rem);
        font-weight: 700; line-height: 1; margin: 10px 0;
        font-variant-numeric: tabular-nums;
    }
    .date-display { font-size: 1.2rem; color: var(--text-sub); }

    /* PRエリア */
    .pr-section {
        margin: 30px 0; text-align: center; width: 100%;
    }
    .catchphrase {
        font-size: 1.1rem; line-height: 1.6; font-weight: 400;
        background: linear-gradient(to right, #fff, var(--accent-color));
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    /* ハンバーガーメニュー（アクセシビリティ対応：タップエリア拡大） */
    .menu-trigger {
        position: fixed; top: 15px; right: 15px; z-index: 1001;
        width: 48px; height: 48px; background: var(--card-bg);
        border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);
        display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px;
    }
    .menu-trigger span { width: 24px; height: 3px; background: #fff; border-radius: 2px; transition: 0.3s; }
    .menu-trigger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .menu-trigger.open span:nth-child(2) { opacity: 0; }
    .menu-trigger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

    /* ナビゲーション（フル画面） */
    .side-nav {
        position: fixed; top: 0; right: -100%; width: 100%; height: 100%;
        background: rgba(13, 27, 42, 0.98); backdrop-filter: blur(15px);
        z-index: 1000; transition: 0.4s ease-in-out;
        display: flex; flex-direction: column; padding: 80px 40px; box-sizing: border-box;
    }
    .side-nav.open { right: 0; }
    .side-nav a {
        color: #fff; text-decoration: none; font-size: 1.5rem; font-weight: bold;
        padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .side-nav a span { font-size: 0.8rem; color: var(--accent-color); display: block; }

    /* アクセシビリティ設定エリア（ローカルストレージ連動） */
    .settings-area { margin-top: auto; padding-top: 20px; }
    .setting-toggle {
        display: flex; justify-content: space-between; align-items: center;
        padding: 15px 0; font-size: 0.9rem;
    }

    .coming-soon {
        margin-top: 40px; padding: 10px; border: 1px dashed var(--accent-color);
        border-radius: 8px; color: var(--accent-color); font-size: 0.8rem;
    }

    @media (max-width: 400px) {
        .main-clock { font-size: 18vw; }
        .catchphrase { font-size: 0.9rem; }
    }
`;
document.head.appendChild(style);

// --- 2. HTML構造の生成 ---
document.body.innerHTML = `
    <div class="bg-gradient"></div>
    <button class="menu-trigger" id="menuBtn" aria-label="メニューを開く">
        <span></span><span></span><span></span>
    </button>
    
    <nav class="side-nav" id="sideNav">
        <a href="https://shinorail.github.io/"><span>OFFICIAL</span>総合トップ</a>
        <a href="https://shinorail.github.io/links.html"><span>RESOURCES</span>公式リンク集</a>
        <a href="https://shinorail.github.io/main/"><span>RECORDS</span>活動記録</a>
        
        <div class="settings-area">
            <div class="setting-toggle">
                文字サイズ拡大 <input type="checkbox" id="fontLarge">
            </div>
            <div class="setting-toggle">
                ハイコントラスト <input type="checkbox" id="highContrast">
            </div>
            <div style="font-size:0.7rem; color:#555; margin-top:10px;">Settings saved to LocalStorage</div>
        </div>
    </nav>

    <main class="container" id="mainContent">
        <div class="clock-wrap">
            <div id="date" class="date-display">----/--/--</div>
            <div id="clock" class="main-clock">00:00:00</div>
        </div>

        <div class="pr-section">
            <div style="letter-spacing: 5px; font-size: 0.8rem; margin-bottom: 5px;">篠ノ井乗務区</div>
            <div class="catchphrase" id="catchphrase">
                信州の鼓動を、正確な時とともに。
            </div>
        </div>

        <div class="coming-soon">COMING SOON: 新システムを鋭意開発中</div>
        
        <footer style="margin-top:40px; font-size:0.7rem; color:#444;">
            Ver 3.0.0 | Produced by Shinonoi Rail
        </footer>
    </main>
`;

// --- 3. JavaScript ロジック（LocalStorage & Accessibility） ---

const menuBtn = document.getElementById('menuBtn');
const sideNav = document.getElementById('sideNav');
const fontLargeCheck = document.getElementById('fontLarge');
const highContrastCheck = document.getElementById('highContrast');
const mainContent = document.getElementById('mainContent');

// メニュー開閉
menuBtn.onclick = () => {
    const isOpen = sideNav.classList.toggle('open');
    menuBtn.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
};

// ローカルストレージ：設定の読み込みと適用
function loadSettings() {
    const isFontLarge = localStorage.getItem('fontLarge') === 'true';
    const isHighContrast = localStorage.getItem('highContrast') === 'true';

    fontLargeCheck.checked = isFontLarge;
    highContrastCheck.checked = isHighContrast;

    applySettings(isFontLarge, isHighContrast);
}

function applySettings(fontLarge, highContrast) {
    document.body.style.fontSize = fontLarge ? '1.2em' : '1em';
    if (highContrast) {
        document.documentElement.style.setProperty('--bg-color', '#000000');
        document.documentElement.style.setProperty('--accent-color', '#ffff00');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#0d1b2a');
        document.documentElement.style.setProperty('--accent-color', '#00d4ff');
    }
}

// 設定変更時の保存
fontLargeCheck.onchange = () => {
    localStorage.setItem('fontLarge', fontLargeCheck.checked);
    loadSettings();
};
highContrastCheck.onchange = () => {
    localStorage.setItem('highContrast', highContrastCheck.checked);
    loadSettings();
};

// 時計更新
function update() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('ja-JP', { hour12: false });
    document.getElementById('date').textContent = now.toLocaleDateString('ja-JP', { 
        year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' 
    });
    requestAnimationFrame(update);
}

// 初期化
loadSettings();
update();
