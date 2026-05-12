/**
 * 篠ノ井乗務区 公式デジタルクロック & 総合ポータル
 * Version: 2.5.0 "Shinonoi-Portal-Modern"
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
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 30px;
        padding: 50px 20px;
        text-align: center;
        box-shadow: 0 15px 50px rgba(0,0,0,0.6);
    }
    .main-clock {
        font-size: clamp(3.5rem, 15vw, 7rem);
        font-weight: 200;
        margin: 15px 0;
        color: #fff;
        letter-spacing: -2px;
        text-shadow: 0 0 30px rgba(255,255,255,0.2);
    }
    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 15px; margin: 40px 0;
    }
    .info-item {
        background: rgba(0,0,0,0.4);
        padding: 15px; border-radius: 18px;
        font-size: 0.75rem; border: 1px solid rgba(255,255,255,0.05);
    }
    .info-val { font-size: 1.1rem; color: #00d4ff; margin-top: 5px; font-weight: bold; }
    
    .nav-links {
        display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 30px;
    }
    .nav-btn {
        text-decoration: none; color: #fff; background: rgba(255,255,255,0.1);
        padding: 12px 25px; border-radius: 50px; font-size: 0.9rem;
        transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 1px solid rgba(255,255,255,0.2);
    }
    .nav-btn:hover { 
        background: #fff; color: #000; 
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    }
    
    .section-title {
        font-size: 0.7rem; letter-spacing: 3px; color: #888;
        margin-top: 50px; text-transform: uppercase;
    }
    .coming-soon {
        display: inline-block; padding: 6px 16px; background: rgba(230, 57, 70, 0.2);
        color: #ff4d6d; border: 1px solid #e63946;
        border-radius: 8px; font-size: 0.75rem; margin: 8px;
    }
    .version { font-size: 0.7rem; color: #444; margin-top: 60px; letter-spacing: 1px; }
`;
document.head.appendChild(style);

// --- 2. HTML構造の生成 ---
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

container.innerHTML = `
    <div style="font-size:1.1rem; font-weight:bold; letter-spacing:6px; color:#fff;">篠ノ井乗務区</div>
    <div style="font-size:0.75rem; color:#888; margin-top:5px; letter-spacing:1px;">SHINONOI RAILWAY BUREAU OFFICIAL PORTAL</div>
    
    <div id="clock" class="main-clock">00:00:00</div>
    <div id="date" style="font-size:1.2rem; opacity:0.8; font-weight:300;">----年--月--日</div>

    <div class="info-grid">
        <div class="info-item">NTP DRIFT<div id="drift" class="info-val">Syncing...</div></div>
        <div class="info-item">UNIX TIME<div id="unix" class="info-val">----------</div></div>
        <div class="info-item">BATTERY<div id="battery" class="info-val">--%</div></div>
    </div>

    <div class="section-title">Official Portals</div>
    <div class="nav-links">
        <a href="https://shinorail.github.io/" class="nav-btn">乗務区 総合トップ</a>
        <a href="https://shinorail.github.io/links.html" class="nav-btn">公式リンク集</a>
        <a href="https://shinorail.github.io/main/" class="nav-btn">活動記録ページ</a>
    </div>

    <div class="section-title">Project Development</div>
    <div style="margin-top:10px;">
        <span class="coming-soon">乗務行路表システム</span>
        <span class="coming-soon">制作案内アーカイブ</span>
    </div>

    <div class="version">
        SHINONOI SYSTEM Ver 2.5.0 | Produced by Shinonoi Rail Executive
    </div>
`;

// --- 3. JavaScript ロジック ---
let timeDrift = 0;

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

if (navigator.getBattery) {
    navigator.getBattery().then(batt => {
        const updateBatt = () => {
            const level = (batt.level * 100).toFixed(0);
            document.getElementById('battery').textContent = `${level}%`;
        };
        updateBatt();
        batt.onlevelchange = updateBatt;
    });
}

function update() {
    const now = new Date();
    const accurate = new Date(Date.now() - timeDrift);

    document.getElementById('clock').textContent = now.toLocaleTimeString('ja-JP', { hour12: false });
    document.getElementById('date').textContent = now.toLocaleDateString('ja-JP', { 
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' 
    });
    document.getElementById('unix').textContent = Math.floor(accurate.getTime() / 1000);

    requestAnimationFrame(update);
}

syncTime();
update();
setInterval(syncTime, 60000);
