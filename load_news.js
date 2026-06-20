document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    let newsListElement;
    let filterType;

    // ページに応じたフィルター設定
    if (currentPage === 'train-news.html') {
        newsListElement = document.getElementById('train-news-list');
        filterType = 'train'; // Train-News用
    } else if (currentPage === 'general-news.html' || currentPage === 'news.html') {
        newsListElement = document.getElementById('general-news-list') || document.getElementById('news-content');
        filterType = 'general'; // 一般お知らせ用
    } else {
        return;
    }

    if (!newsListElement) return;

    // プリローダー非表示処理
    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        const loadingText = document.getElementById('loading-text');
        if (loadingText) loadingText.textContent = '読み込み完了... 100%';
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden'); 
                preloader.style.display = 'none';
            }
        }, 100); 
    };

    const loadNewsFromMD = async () => {
        try {
            // キャッシュを防いで news.md を読み込む
            const response = await fetch('news.md?v=' + new Date().getTime(), { cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP Status: ${response.status}`);
            
            const text = await response.text();
            const items = text.split(/^##\s+/m).filter(item => item.trim() !== "");

            newsListElement.innerHTML = ''; 

            let hasContent = false;

            items.forEach(item => {
                const lines = item.split('\n');
                const headerLine = lines[0].trim(); // 例: "2026/01/01 【重要】 Train-Newsページ公開しました"
                const bodyText = lines.slice(1).join('\n').trim();

                // 日付、タグ、タイトルを分解
                const match = headerLine.match(/^([\d/]+)\s+【(.+?)】\s+(.+)$/);
                if (!match) return;

                const [_, date, tag, title] = match;

                // 振り分けルール（タイトルやタグに Train または 列車 が含まれる場合は train 属性にする）
                let itemType = 'general';
                if (tag.includes('Train') || title.toLowerCase().includes('train') || title.includes('列車') || title.includes('篠ノ井線')) {
                    itemType = 'train';
                }

                // 現在のページの種類と一致するものだけを表示
                if (filterType === 'train' && itemType !== 'train') return;
                if (filterType === 'general' && itemType === 'train') return;

                hasContent = true;

                // HTML要素を作成して流し込み
                const article = document.createElement('article');
                article.className = `news-article ${tag === '重要' ? 'important' : ''}`;
                
                article.innerHTML = `
                    <span class="news-category" style="background:#004da0; color:#fff; padding:2px 6px; border-radius:3px; font-size:12px;">【${tag}】</span>
                    <h2 style="margin:8px 0; font-size:18px;">${title}</h2>
                    <span class="news-date" style="color:#777; font-size:12px;">公開日: ${date}</span>
                    <div class="news-content" style="margin-top:10px; line-height:1.6;">
                        ${marked.parse(bodyText)}
                    </div>
                    <hr style="border:0; border-top:1px dashed #ccc; margin:20px 0;">
                `;
                newsListElement.appendChild(article);
            });

            if (!hasContent) {
                newsListElement.innerHTML = `<p style="text-align:center;">現在、該当するお知らせはありません。</p>`;
            }

        } catch (error) {
            console.error("エラー:", error);
            newsListElement.innerHTML = `<p style="color:red; text-align:center;">お知らせの読み込みに失敗しました。</p>`;
        } finally {
            hidePreloader(); 
        }
    };

    loadNewsFromMD();
});
