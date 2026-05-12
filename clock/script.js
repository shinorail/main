/**
 * 篠ノ井乗務区 公式デジタルクロック & ポータル
 * Version: 2.0.0 "Shinonoi-Glass"
 */

// --- 1. スタイル設定（CSS in JS） ---
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
        min-height: 100vh; overflow-y: auto; padding: 20px 0;
    }
    @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    .container {
        width: 90%; max-width: 800px;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 24px;
        padding: 40px 20px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    }
    .main-clock {
        font-size: clamp(3.5rem, 12vw, 6rem);
        font-weight: 100;
        margin: 10px 0;
        color: #fff;
        text-shadow: 0 0 20px rgba(255,255,255,0.3);
    }
    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 15px; margin: 30px 0;
    }
    .info-item {
        background: rgba(0,0,0,0.3);
        padding: 15px; border-radius: 15px;
        font-size: 0.8rem;
    }
    .info-val { font-size: 1.1rem; color: #00d4ff; margin-top: 5px; }
    
    .nav-links {
        display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 30px;
    }
    .nav-btn {
        text-decoration: none; color: #fff; background: rgba(255,255,255,0.1);
        padding: 10px 20px; border-radius: 50px; font-size: 0.8rem;
        transition: 0.3s; border: 1px solid rgba(255,255,255,0.2);
    }
    .nav-btn:hover { background: rgba(255,255,255,0.3); transform: translateY(-3px); }
    
    .section-title {
        font-size: 0.7rem; letter-spacing: 2px; color: #888;
        margin-top: 40px; text-transform: uppercase;
    }
    .coming-soon {
        display: inline-block; padding: 5px 15px; background: #e63946;
        border-radius: 4px; font-size: 0.7rem; margin: 5px;
    }
    .version { font-size: 0.7rem; color: #555; margin-top: 40px; }
`;
document.head.appendChild(style);

// --- 2. HTML構造の生成 ---
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

container.innerHTML = `
    <div style="font-size:0.9rem; font-weight:bold; letter-spacing:4px;">篠ノ井乗務区</div>
    <div style="font-size:0.7rem; color:#888;">OFFICIAL PRECISION TIMEKEEPING</div>
    
    <div id="clock" class="main-clock">00:00:00</div>
    <div id="date" style="font-size:1.1rem; opacity:0.7;">----年--月--日</div>

    <div class="info-grid">
        <div class="info-item">NTP DRIFT<div id="drift" class="info-val">Syncing...</div></div>
        <div class="info-item">UNIX TIME<div id="unix" class="info-val">----------</div></div>
        <div class="info-item">BATTERY<div id="battery" class="info-val">--%</div></div>
    </div>

    <div class="section-title">Official Links</div>
    <div class="nav-links">
        <a href="https://shinorail.github.io/" class="nav-btn">区 ホームページ</a>
        <a href="https://shinorail.github.io/links.html" class="nav-btn">公式リンク集</a>
        <a href="https://shinorail.github.io/main/" class="nav-btn">活動ページ</a>
    </div>

    <div class="section-title">Upcoming Features</div>
    <div style="margin-top:10px;">
        <span class="coming-soon">乗務行路表表示</span>
        <span class="coming-soon">列車運行情報API連携</span>
        <span class="coming-soon">制作案内アーカイブ</span>
    </div>

    <div class="version">
        Shinonoi System Ver 2.0.0 | Produced by Shinonoi Rail
    </div>
`;

// --- 3. JavaScript ロジック ---
let timeDrift = 0;

// 時刻同期
async function syncTime() {
    try {
        const start = Date.now();
        const res = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
        const data = await res.json();
        const latency = (Date.now() - start) / 2;
        const serverTime = new Date(data.datetime).getTime() + latency;
        timeDrift = Date.now() - serverTime;
        document.getElementById('drift').textContent = `${timeDrift.toFixed(0)}ms`;
    } catch (e) {
        document.getElementById('drift').textContent = "Offline";
    }
}

// バッテリー
if (navigator.getBattery) {
    navigator.getBattery().then(batt => {
        const updateBatt = () => document.getElementById('battery').textContent = `${(batt.level * 100).toFixed(0)}%`;
        updateBatt();
        batt.onlevelchange = updateBatt;
    });
}

// メイン更新
function update() {
    const now = new Date();
    const accurate = new Date(Date.now() - timeDrift);

    document.getElementById('clock').textContent = now.toLocaleTimeString('ja-JP', { hour12: false });
    document.getElementById('date').textContent = now.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
    document.getElementById('unix').textContent = Math.floor(accurate.getTime() / 1000);

    requestAnimationFrame(update);
}

syncTime();
update();
setInterval(syncTime, 60000);
