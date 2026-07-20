document.addEventListener("DOMContentLoaded", function() {
    // 1. 季節と完走判定の準備
    const history = JSON.parse(localStorage.getItem('stampHistory') || '{}');
    const isComplete = Object.keys(history).length >= 4;
    const month = new Date().getMonth() + 1;
    let effectChar = "❄️";
    if (month >= 3 && month <= 5) effectChar = "🌸";
    else if (month >= 6 && month <= 8) effectChar = "💧";
    else if (month >= 9 && month <= 11) effectChar = "🍁";

    // 2. スタンプの自動記録
    try {
        const pagesMap = { 'index.html': 'index', 'news.html': 'news', 'train-news.html': 'train-news', 'renkei.html': 'renkei' };
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        if (localStorage.getItem('stamp_agreed') === 'true' && pagesMap[currentPath]) {
            history[pagesMap[currentPath]] = true;
            localStorage.setItem('stampHistory', JSON.stringify(history));
        }
    } catch (e) { console.log("Stamp recording error"); }

    // 3. 共通パーツの生成（★CSS完全連動版）
    renderParts();

    // 4. エフェクトの開始
    startEffect(effectChar, isComplete);

    // 5. お知らせの取得
    const newsBox = document.getElementById('top-news-list');
    if (newsBox) {
        loadNews(newsBox);
    }

    // --- 【修正】ハンバーガーメニューのJS制御を完全に削除（CSS側に一任するため） ---

    // --- スクロール時にヘッダーを固定・小型化 & ページ上部へ戻るボタン ---
    const header = document.querySelector('header');
    const topBtn = document.createElement('div');
    topBtn.innerHTML = '▲';
    topBtn.style.cssText = 'position:fixed;bottom:20px;right:20px;width:45px;height:45px;background:#004da0;color:#fff;display:none;align-items:center;justify-content:center;border-radius:50%;cursor:pointer;z-index:10001;font-weight:bold;box-shadow:0 3px 10px rgba(0,0,0,0.3);transition:0.3s;';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            topBtn.style.display = 'flex';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
            topBtn.style.display = 'none';
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

function renderParts() {
    const header = document.querySelector('header');
    if (header) {
        // ヘッダーを上部固定に設定
        header.style.cssText = "position:fixed;top:0;left:0;width:100%;z-index:10000;background:#004da0;transition:all 0.3s ease;padding:15px 0;";
        
        // ★【最重要】CSSだけで動くように、隠しチェックボックス(input)とlabel構造をJSから出力します
        header.innerHTML = `
            <div class="header-inner" style="max-width:1000px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;padding:0 20px;">
                <h1 style="margin:0;font-size:1.1em;color:white;letter-spacing:1px;">篠ノ井乗務区 公式サイト</h1>
                
                <input type="checkbox" id="nav-toggle" class="nav-toggle-checkbox">
                
                <label for="nav-toggle" class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>`;
    }

    const nav = document.querySelector('nav');
    if (nav) {
        // ★【最重要】nav要素にクラス名「nav-menu」を付与し、内部構造を整理
        nav.className = "nav-menu";
        nav.innerHTML = `
            <ul class="nav-list">
                <li><a href="index">ホーム</a></li>
                <li><a href="news">お知らせ <span style="display:inline-block;width:8px;height:8px;background:#ff3b30;border-radius:50%;margin-left:5px;vertical-align:middle;"></span></a></li>
                <li><a href="train-news">Train-News</a></li>
                <li><a href="ad" style="color: #2e7d32; font-weight: bold;">手作り広告</a></li>
                <li><a href="mission#2026">活動理念</a></li>
                <li><a href="portfolio">写真記録</a></li>
                <li><a href="stamp" style="color: #e63946; font-weight: bold;">乗車印帳</a></li>
                <li><a href="contact">お問い合わせ</a></li>
                <li><a href="faq">よくある質問</a></li>
                <li><a href="links">SNS/外部リンク</a></li>
                <li><a href="renkei" style="color: #ffcc00; font-weight: bold;">連携パーツ配布</a></li>
            </ul>`;
            
        // JSでheaderの中にnavを移動（CSSの「~」間接セレクタを通すための必須処理）
        const headerInner = document.querySelector('.header-inner');
        if (headerInner) {
            headerInner.appendChild(nav);
        }
    }

    const footer = document.querySelector('footer');
    if (footer) {
        const adContainer = document.createElement('div');
        adContainer.style.cssText = "max-width: 800px; margin: 30px auto; padding: 20px; border: 2px dashed #8b4513; background: #fff9e6; text-align: center; position: relative; border-radius: 8px;";
        adContainer.innerHTML = `
            <span style="position: absolute; top: -12px; left: 15px; background: #8b4513; color: #fff; padding: 2px 12px; font-size: 0.75em; border-radius: 4px; font-weight: bold;">沿線掲示板（広告）</span>
            <div id="admax-area" style="min-height: 100px; display: flex; justify-content: center; align-items: center; margin: 10px 0;">
                </div>
            <p style="margin: 10px 0 0 0; font-size: 0.7em; color: #9a7d5d;">※この広告収入は鉄道活動の運営費に充てられます</p>
        `;
        footer.parentNode.insertBefore(adContainer, footer);

        const adScript = document.createElement('script');
        adScript.src = "https://adm.shinobi.jp/o/2791c03bc086135607731d2a0eb484fd";
        document.getElementById('admax-area').appendChild(adScript);

        footer.innerHTML = `
            <div class="footer-inner" style="text-align: center; padding: 20px; font-size: 0.9em; line-height: 1.8; color: #555; border-top: 1px solid #ddd;">
                <p>当サイトでは、Google Geminiなどの生成AI技術を活用し、サービスの品質向上に努めております。</p>
                <p>お問い合わせ：<a href="contact.html" style="color: #004da0; font-weight: bold; text-decoration: underline;">お問い合わせフォーム</a></p>
                <div style="margin: 20px 0;">
                    <a href="policy.html" style="color:#666; text-decoration:none; margin: 0 10px; border-bottom: 1px solid #ccc;">規約・ポリシー</a>
                    <a href="renkei.html" style="color:#004da0; text-decoration:none; margin: 0 10px; font-weight:bold;">公式連携パーツ配布中</a>
                </div>
                <p style="font-weight: bold; margin-bottom: 5px;">運営：篠ノ井乗務区</p>
                <p style="margin: 0;">&copy; 2026 篠ノ井乗務区 All Rights Reserved.</p>
            </div>`;
    }
}

function startEffect(char, isComplete) {
    const finalChar = isComplete ? "✨" : char;
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
    document.body.appendChild(container);
    setInterval(() => {
        const f = document.createElement('div');
        f.innerText = finalChar;
        const duration = isComplete ? 4 : 6;
        f.style.cssText = `position:absolute;top:-30px;left:${Math.random()*100}%;font-size:${Math.random()*20+15}px;opacity:${Math.random()};user-select:none;transition:transform ${duration}s linear, top ${duration}s linear; color:${isComplete ? '#ffd700' : 'inherit'};`;
        container.appendChild(f);
        setTimeout(() => { if(f) { f.style.top = '110%'; f.style.transform = `rotate(${Math.random()*360}deg)`; } }, 100);
        setTimeout(() => { if(f && f.parentNode) f.remove(); }, duration * 1000);
    }, isComplete ? 400 : 800);
}

(function() {
    const ua = navigator.userAgent.toLowerCase();
    const isSNS = /instagram|fbav|line|twitter|twttr/.test(ua);
    if (isSNS && !window.location.pathname.includes('bridge.html')) {
        window.location.href = 'bridge.html';
    }
})();

async function loadNews(container) {
    const url = "https://script.google.com/macros/s/AKfycbwbUTBxVeTkRlAJ1dnBlgcmpGaWI9B0SeMwkwKSwAJYjRDAtVcX67QwA5FcNGaJE9Cq/exec";
    try {
        const res = await fetch(url + "?sheet=お知らせ");
        const data = await res.json();
        const loading = document.getElementById('news-loading');
        if (loading) loading.style.display = 'none';
        container.innerHTML = "";
        data.reverse().slice(0, 3).forEach(item => {
            const li = document.createElement('li');
            li.style.cssText = "padding: 10px 0; border-bottom: 1px dashed #eee; display: flex; gap: 15px; font-size: 0.95em; text-align: left;";
            li.innerHTML = `<span>${item.日付 || ""}</span><span style="background:#004da0;color:white;padding:2px 6px;border-radius:3px;font-size:0.75em;">${item.カテゴリ || "一般"}</span><span>${item.内容 || ""}</span>`;
            container.appendChild(li);
        });
    } catch (e) {
        if (container) container.innerHTML = "<li>お知らせの取得に失敗しました。</li>";
    }
}
fetch("/main/config.json")
  .then(res => res.json())
  .then(cfg => {
    if (cfg.maintenance) {
      window.location.href = "/maintenance.html";
    }
  })
  .catch(err => console.error("設定ファイルが読み込めません:", err));
