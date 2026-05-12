/**
 * 篠ノ井乗務区 統合制御スクリプト
 */

const doc = document.documentElement;
const body = document.body;
const menuBtn = document.getElementById('menuBtn');
const sidePanel = document.getElementById('sidePanel');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');
const contrastBtn = document.getElementById('contrastBtn');

// 1. ローカルストレージから設定を復元
function initSettings() {
    const savedSize = localStorage.getItem('shinonoi-font-size') || '16';
    const savedContrast = localStorage.getItem('shinonoi-contrast') === 'true';

    applyFontSize(savedSize);
    applyContrast(savedContrast);
}

// 2. 文字サイズ適用
function applyFontSize(size) {
    doc.style.setProperty('--font-size', size + 'px');
    sizeSlider.value = size;
    sizeValue.textContent = size + 'px';
    localStorage.setItem('shinonoi-font-size', size);
}

// 3. ハイコントラスト適用
function applyContrast(isHigh) {
    if (isHigh) {
        body.classList.add('high-contrast');
    } else {
        body.classList.remove('high-contrast');
    }
    localStorage.setItem('shinonoi-contrast', isHigh);
}

// 4. 時計更新（1秒ごと）
function updateClock() {
    const now = new Date();
    
    // 時刻
    const timeStr = now.toLocaleTimeString('ja-JP', { hour12: false });
    document.getElementById('clock').textContent = timeStr;

    // 日付
    const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const w = weeks[now.getDay()];
    document.getElementById('date').textContent = `${y}/${m}/${d} (${w})`;

    requestAnimationFrame(updateClock);
}

// --- イベントリスナー ---

// メニュー開閉
menuBtn.addEventListener('click', () => {
    sidePanel.classList.toggle('open');
});

// 文字サイズスライダー
sizeSlider.addEventListener('input', (e) => {
    applyFontSize(e.target.value);
});

// コントラストボタン
contrastBtn.addEventListener('click', () => {
    const isNowHigh = body.classList.contains('high-contrast');
    applyContrast(!isNowHigh);
});

// 画面外クリックでメニューを閉じる
document.addEventListener('touchstart', (e) => {
    if (!sidePanel.contains(e.target) && !menuBtn.contains(e.target)) {
        sidePanel.classList.remove('open');
    }
}, {passive: true});

// 起動
initSettings();
updateClock();
