// --- 1. 画面全体のスタイル設定 ---
document.body.style.backgroundColor = "#000"; // 真っ黒
document.body.style.color = "#00ff41";       // マトリックス風グリーン
document.body.style.margin = "0";
document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.fontFamily = "'Courier New', Courier, monospace";
document.body.style.overflow = "hidden";

// --- 2. 表示用要素の作成 ---
const container = document.createElement("div");
container.style.textAlign = "center";
document.body.appendChild(container);

const clockLabel = document.createElement("div");
clockLabel.textContent = "DEVICE LOCAL TIME";
clockLabel.style.fontSize = "20px";
container.appendChild(clockLabel);

const clockDisplay = document.createElement("div");
clockDisplay.style.fontSize = "100px";
clockDisplay.style.fontWeight = "bold";
clockDisplay.style.textShadow = "0 0 20px #00ff41";
container.appendChild(clockDisplay);

const infoDisplay = document.createElement("div");
infoDisplay.style.marginTop = "30px";
infoDisplay.style.fontSize = "18px";
infoDisplay.style.lineHeight = "1.6";
infoDisplay.style.color = "#888";
container.appendChild(infoDisplay);

let timeDrift = 0; // 端末とサーバーの誤差(ミリ秒)

// --- 3. 標準時APIから正確な時間を取得して誤差を計算 ---
async function syncTime() {
    infoDisplay.innerHTML = "Syncing with NTP server...";
    try {
        const start = Date.now();
        // 世界標準時を取得できる公共API
        const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
        const data = await response.json();
        
        const end = Date.now();
        const latancy = (end - start) / 2; // 通信の往復ラグを半分にする
        
        const serverTime = new Date(data.datetime).getTime() + latancy;
        const localTime = Date.now();
        
        // 端末時計がどれだけズレているか（プラスなら端末が進んでいる）
        timeDrift = localTime - serverTime;
        
        console.log("Sync complete. Drift: " + timeDrift + "ms");
    } catch (e) {
        infoDisplay.innerHTML = "Sync failed. Using local clock only.";
    }
}

// --- 4. メインの更新ループ ---
function update() {
    const now = new Date();
    const accurateTime = new Date(Date.now() - timeDrift); // 誤差を補正した時間

    // 表示用の文字列作成
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ms = String(now.getMilliseconds()).padStart(3, '0');

    clockDisplay.textContent = `${h}:${m}:${s}`;

    // 詳細情報の表示
    const offset = -now.getTimezoneOffset();
    const gmt = (offset >= 0 ? "+" : "") + (offset / 60);

    infoDisplay.innerHTML = `
        <div style="color:#00ff41">ミリ秒: ${ms}</div>
        <div>タイムゾーン: GMT ${gmt}</div>
        <div>端末の時計の誤差: <span style="color:white">${timeDrift.toFixed(0)} ms</span></div>
        <div style="font-size:12px; margin-top:10px;">
            UTC (標準時): ${accurateTime.toUTCString()}
        </div>
    `;

    requestAnimationFrame(update); // 次の描画タイミングで再度実行（より滑らか）
}

// 実行
syncTime(); // 最初に一度サーバーと同期
update();   // 時計の開始

// 1分ごとに裏でこっそり再同期して精度を保つ
setInterval(syncTime, 60000);
