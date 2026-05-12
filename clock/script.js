// --- 1. 画面のレイアウト（CSS的な設定） ---
document.body.style.backgroundColor = "#282c34"; // ダークモード風
document.body.style.color = "#61dafb";           // ネオンブルー
document.body.style.display = "flex";
document.body.style.flexDirection = "column";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.margin = "0";

// --- 2. 時計を表示する要素を作る ---
const clockElement = document.createElement("div");
clockElement.style.fontSize = "80px";
clockElement.style.fontWeight = "bold";
clockElement.style.fontFamily = "monospace";
document.body.appendChild(clockElement);

// --- 3. 日付を表示する要素を作る ---
const dateElement = document.createElement("div");
dateElement.style.fontSize = "24px";
dateElement.style.marginTop = "10px";
document.body.appendChild(dateElement);

// --- 4. 時間を更新する関数 ---
function updateClock() {
    const now = new Date(); // 現在時刻を取得

    // 時間、分、秒を取得して2桁に揃える
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // 画面に表示
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    // 日付も表示（おまけ）
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    dateElement.textContent = `${y}年${m}月${d}日`;
}

// --- 5. 実行 ---
// 1000ミリ秒（1秒）ごとに updateClock を呼び出す
setInterval(updateClock, 1000);

// 最初に1回実行して、読み込み時の空白を防ぐ
updateClock();
