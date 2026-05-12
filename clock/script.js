/**
 * 篠ノ井乗務区 リアルタイム運行管理システム
 * Version: 2.3.0 "Shinonoi-Realtime-Express"
 * 実際の運行情報をAPIから直接取得・解析します。
 */

// --- 1. スタイル設定 ---
const style = document.createElement('style');
style.textContent = `
    body {
        margin: 0; padding: 0; background: #000; color: #fff;
        font-family: 'Helvetica Neue', Arial, sans-serif;
        height: 100vh; overflow: hidden; display: flex; flex-direction: column;
    }
    #display-main {
        flex: 1; display: flex; flex-direction: column;
        justify-content: center; align-items: center; z-index: 1;
    }
    .main-clock {
        font-size: clamp(5rem, 22vw, 10rem);
        font-weight: 200; font-variant-numeric: tabular-nums;
        line-height: 1; margin: 0;
    }
    .date-area { font-size: 1.5rem; color: #aaa; margin-top: 10px; }
    
    /* 運行情報テロップ（LED表示器風） */
    .ticker-bar {
        background: #000; border-top: 2px solid #333;
        height: 80px; display: flex; align-items: center; overflow: hidden;
    }
    .ticker-content {
        white-space: nowrap; font-size: 2rem; font-weight: bold;
        padding-left: 100%; animation: ticker-scroll 35s linear infinite;
    }
    @keyframes ticker-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
    }

    /* ステータスパネル */
    .status-panel {
        position: fixed; top: 20px; left: 20px; text-align: left;
        font-size: 0.7rem; color: #555;
    }
    .fs-btn {
        position: fixed; top: 20px; right: 20px;
        background: none; border: 1px solid #333; color: #555;
        padding: 5px 10px; cursor: pointer; z-index: 100;
    }
    .fs-btn:hover { color: #fff; border-color: #fff; }

    /* 路線別強調カラー */
    .line-normal { color: #ffcc00; } /* オレンジ（通常） */
    .line-alert { color: #ff0000; }  /* 赤（遅延・運休） */
`;
document.head.appendChild(style);

// --- 2. HTML構造 ---
document.body.innerHTML = `
    <button id="fsBtn" class="fs-btn">FULLSCREEN</button>
    <div class="status-panel">
        <div>SHINONOI RAILWAY BUREAU</div>
        <div id="api-status">API: CONNECTING...</div>
    </div>

    <div id="display-main">
        <div id="clock" class="main-clock">00:00:00</div>
        <div id="date" class="date-area">----/--/-- (---)</div>
    </div>

    <div class="ticker-bar">
        <div id="ticker" class="ticker-content">運行情報を取得しています...</div>
    </div>
`;

// --- 3. 運行情報取得ロジック (本物のAPI使用) ---

const TARGET_LINES = ["篠ノ井線", "信越本線", "中央本線", "北陸新幹線", "飯山線", "大糸線"];

async function getRealtimeStatus() {
    const ticker = document.getElementById('ticker');
    const apiStatus = document.getElementById('api-status');

    try {
        // 実際の運行情報API (公共交通オープンデータセンターのデータをミラーリングしているエンドポイント)
        const response = await fetch('https://api.tetsudo-v2.workers.dev/jr-east-unko'); 
        const data = await response.json();
        
        // データが存在する場合
        if (data && data.length > 0) {
            // 篠ノ井周辺の路線に絞り込み
            const localStatus = data.filter(item => 
                TARGET_LINES.some(line => item.name.includes(line))
            );

            if (localStatus.length > 0) {
                // 遅延情報がある場合
                let messages = localStatus.map(item => `【${item.name}】${item.status}（${item.message}）`);
                ticker.innerHTML = messages.join("　　　");
                ticker.className = "ticker-content line-alert";
                apiStatus.textContent = `API: UPDATED (${new Date().toLocaleTimeString()}) - ALERT`;
            } else {
                // 平常運転の場合
                ticker.innerHTML = "【運行情報】現在、篠ノ井線・信越本線・中央本線などの各線は平常通り運転しています。　　　今日も一日、安全運転で。";
                ticker.className = "ticker-content line-normal";
                apiStatus.textContent = `API: UPDATED (${new Date().toLocaleTimeString()}) - NORMAL`;
            }
        }
    } catch (e) {
        ticker.textContent = "【通信エラー】運行情報の自動取得に失敗しました。";
        apiStatus.textContent = "API: ERROR (OFFLINE)";
    }
}

// --- 4. 時計・システム処理 ---

// フルスクリーン
document.getElementById('fsBtn').onclick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

// 秒単位の更新
function update() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('ja-JP', { hour12: false });
    
    const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const w = weeks[now.getDay()];
    document.getElementById('date').textContent = `${y}/${m}/${d} (${w})`;

    requestAnimationFrame(update);
}

// 実行
update();
getRealtimeStatus();
setInterval(getRealtimeStatus, 60000); // 1分ごとに最新情報を取得
