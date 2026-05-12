/**
 * 篠ノ井乗務区 総合ポータル - Universal Design System
 * Version: 4.0.0 "Shinonoi-Inclusive"
 * 全機能搭載・LocalStorage完全連動
 */

// --- 1. CSS定数と基本スタイル ---
const style = document.createElement('style');
style.textContent = `
    :root {
        /* 動的に変更される変数 */
        --base-font-size: 16px;
        --bg-color: #0d1b2a;
        --text-color: #ffffff;
        --accent-color: #00d4ff;
        --card-bg: rgba(255, 255, 255, 0.08);
        --btn-bg: rgba(255, 255, 255, 0.1);
    }

    /* ハイコントラストモード用クラス */
    body.high-contrast {
        --bg-color: #000000;
        --text-color: #ffff00;
        --accent-color: #ffff00;
        --card-bg: #000000;
        --btn-bg: #000000;
        border: 4px solid #ffff00;
    }

    body {
        margin: 0; padding: 0;
        font-size: var(--base-font-size);
        background: var(--bg-color);
        color: var(--text-color);
        font-family: system-ui, -apple-system, sans-serif;
        transition: background 0.3s, color 0.3s, font-size 0.2s;
        min-height: 100vh;
        display: flex; flex-direction: column; align-items: center;
        overflow-x: hidden;
    }

    /* メインコンテナ */
    .main-wrapper {
        width: 100%; max-width: 800px;
        padding: 40px 20px;
        box-sizing: border-box;
        text-align: center;
        flex: 1; display: flex; flex-direction: column; justify-content: center;
    }

    /* 時計ユニット */
    .clock-box { margin-bottom: 2rem; }
    .display-time {
        font-size: clamp(4rem, 20vw, 10rem);
        font-weight: 800; line-height: 1;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 0 20px rgba(255,255,255,0.1);
    }
    .display-date { font-size: 1.5rem; opacity: 0.8; margin-top: 10px; }

    /* キャッチコピー */
    .pr-text { margin: 2rem 0; font-size: 1.2rem; font-weight: 300; line-height: 1.6; }

    /* ハンバーガーメニュー */
    .menu-toggle {
        position: fixed; top: 20px; right: 20px; z-index: 2000;
        width: 60px; height: 60px; background: var(--btn-bg);
        border: 2px solid var(--accent-color); border-radius: 15px;
        cursor: pointer; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 6px;
    }
    .menu-toggle span { width: 30px; height: 4px; background: var(--accent-color); border-radius: 2px; transition: 0.3s; }
    .menu-toggle.active span:nth-child(1) { transform: translateY(10px) rotate(45deg); }
    .menu-toggle.active span:nth-child(2) { opacity: 0; }
    .menu-toggle.active span:nth-child(3) { transform: translateY(-10px) rotate(-45deg); }

    /* 設定パネル（スライドイン） */
    .settings-panel {
        position: fixed; top: 0; right: -100%; width: 100%; max-width: 350px; height: 100%;
        background: #1b263b; z-index: 1500; transition: 0.4s;
        padding: 100px 30px 40px; box-sizing: border-box;
        box-shadow: -10px 0 30px rgba(0,0,0,0.5);
        display: flex; flex-direction: column; gap: 25px; overflow-y: auto;
    }
    .settings-panel.open { right: 0; }
    .setting-group { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; }
    .setting-label { display: block; font-size: 0.9rem; color: var(--accent-color); margin-bottom: 10px; font-weight: bold; }
    
    /* カスタマイズUI（スライダー・ボタン） */
    input[type="range"] { width: 100%; cursor: pointer; }
    .nav-list { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
    .nav-item {
        background: rgba(255,255,255,0.05); color: #fff; text-decoration: none;
        padding: 15px; border-radius: 10px; font-size: 1rem; border: 1px solid transparent; transition: 0.2s;
    }
    .nav-item:hover { border-color: var(--accent-color); background: rgba(255,255,255,0.1); }

    .coming-soon {
        padding: 15px; border: 2px dashed var(--accent-color); border-radius: 12px;
        color: var(--accent-color); font-size: 0.9rem; margin-top: 20px;
    }
`;
document.head.appendChild(style);

// --- 2. HTML構造生成 ---
document.body.innerHTML = `
    <button class="menu-toggle" id="menuBtn" aria-label="メニュー開閉">
        <span></span><span></span><span></span>
    </button>

    <aside class="settings-panel" id="settingsPanel">
        <div style="font-size:1.2rem; font-weight:bold; border-bottom:2px solid var(--accent-color); padding-bottom:10px;">設定 / MENU</div>
        
        <div class="setting-group">
            <label class="setting-label">文字の大きさ: <span id="fontVal">16</span>px</label>
            <input type="range" id="fontSizeSlider" min="12" max="32" value="16">
        </div>

        <div class="setting-group">
            <label class="setting-label">表示モード</label>
            <button id="contrastBtn" style="width:100%; padding:10px; cursor:pointer; background:var(--accent-color); color:#000; border:none; border-radius:5px; font-weight:bold;">
                ハイコントラスト切替
            </button>
        </div>

        <div class="nav-list">
            <a href="https://shinorail.github.io/" class="nav-item">篠ノ井乗務区 総合トップ</a>
            <a href="https://shinorail.github.io/links.html" class="nav-item">公式リンク集</a>
            <a href="https://shinorail.github.io/main/" class="nav-item">活動記録ページ</a>
        </div>

        <div class="coming-soon">COMING SOON: 行路管理システム</div>
    </aside>

    <main class="main-wrapper">
        <div class="clock-box">
            <div id="date" class="display-date">----/--/--</div>
            <div id="clock" class="display-time">00:00:00</div>
        </div>

        <div style="font-size:0.8rem; letter-spacing:5px; opacity:0.6;">SHINONOI RAILWAY BUREAU</div>
        
        <div class="pr-text">
            <strong>信州の鼓動を、正確な時とともに。</strong><br>
            篠ノ井乗務区は鉄道文化の魅力を発信し続けます。
        </div>

        <footer style="font-size:0.7rem; color:#444; margin-top:auto;">
            Ver 4.0.0 | Accessibility Engine v1.0
        </footer>
    </main>
`;

// --- 3. ロジック（全機能・省略なし） ---

const menuBtn = document.getElementById('menuBtn');
const settingsPanel = document.getElementById('settingsPanel');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontValDisp = document.getElementById('fontVal');
const contrastBtn = document.getElementById('contrastBtn');

// メニュー開閉
menuBtn.onclick = () => {
    menuBtn.classList.toggle('active');
    settingsPanel.classList.toggle('open');
};

// ローカルストレージ連動：設定の読み込み
function loadPrefs() {
    const savedSize = localStorage.getItem('pref-font-size') || '16';
    const savedContrast = localStorage.getItem('pref-contrast') === 'true';

    applyFontSize(savedSize);
    applyContrast(savedContrast);
}

// フォントサイズ適用
function applyFontSize(size) {
    document.documentElement.style.setProperty('--base-font-size', size + 'px');
    fontSizeSlider.value = size;
    fontValDisp.textContent = size;
    localStorage.setItem('pref-font-size', size);
}

// コントラスト適用
function applyContrast(isHigh) {
    if (isHigh) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('pref-contrast', isHigh);
}

// イベントリスナー
fontSizeSlider.oninput = (e) => applyFontSize(e.target.value);
contrastBtn.onclick = () => {
    const current = document.body.classList.contains('high-contrast');
    applyContrast(!current);
};

// 時計更新（秒単位で正確に）
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('ja-JP', { hour12: false });
    
    const weeks = ["日", "月", "火", "水", "木", "金", "土"];
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const w = weeks[now.getDay()];
    document.getElementById('date').textContent = `${y}/${m}/${d}(${w})`;
    
    requestAnimationFrame(updateClock);
}

// 実行
loadPrefs();
updateClock();

// 画面外クリックでメニューを閉じる
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !menuBtn.contains(e.target) && settingsPanel.classList.contains('open')) {
        menuBtn.classList.remove('active');
        settingsPanel.classList.remove('open');
    }
});
