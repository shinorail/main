document.addEventListener('DOMContentLoaded', () => {
    // 現在のページURLからファイル名を取得
    const currentPage = window.location.pathname.split('/').pop();

    let newsListElement;
    let filterType;

    // どのページのリスト要素を取得し、どのタイプの記事をフィルタリングするかを設定
    if (currentPage === 'train-news.html') {
        newsListElement = document.getElementById('train-news-list');
        filterType = 'rail'; // 電車関連
    } else if (currentPage === 'general-news.html') {
        newsListElement = document.getElementById('general-news-list');
        filterType = 'general'; // その他
    } else {
        // お知らせページ以外では処理しない
        return;
    }

    if (!newsListElement) {
        console.error(`Error: News list element not found for ${currentPage}.`);
        return;
    }

    // プリローダーを非表示にする処理（エラー発生時も実行されるように分離）
    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        const loadingText = document.getElementById('loading-text');

        if (loadingText) loadingText.textContent = '読み込み完了... 100%';
        
        // すでに navigation.js で非表示にしている可能性が高いが、念のため class も追加
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden'); 
                preloader.style.display = 'none'; // 確実な非表示
            }
        }, 100); 
    };

    const loadNews = async () => {
        try {
            const response = await fetch('news_data.json');
            
            if (!response.ok) {
                throw new Error(`お知らせデータの読み込みに失敗 (HTTP Status: ${response.status})。ファイルパスを確認してください。`);
            }
            
            const newsData = await response.json();
            
            newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
            const filteredNews = newsData.filter(item => item.type === filterType);

            newsListElement.innerHTML = ''; 

            if (filteredNews.length === 0) {
                newsListElement.innerHTML = `<p style="text-align:center;">現在、該当するお知らせはありません。</p>`;
                return;
            }

            filteredNews.forEach(item => {
                const article = document.createElement('article');
                article.className = `news-article ${item.isImportant ? 'important' : ''}`;
                article.id = item.id; 

                article.innerHTML = `
                    <span class="news-category">【${item.category}】</span>
                    <h2>${item.title}</h2>
                    <span class="news-date">公開日: ${item.date}</span>
                    <div class="news-content">
                        ${item.content}
                    </div>
                    <hr>
                `;
                newsListElement.appendChild(article);
            });

        } catch (error) {
            console.error("お知らせデータの処理中にエラーが発生しました:", error);
            // 読み込み失敗時に**赤いエラーメッセージ**を画面に表示
            newsListElement.innerHTML = `<p style="color:red; text-align:center;">
                データの読み込みまたは表示中にエラーが発生しました。<br>
                **ブラウザのコンソール (F12) を開き、赤色のエラーメッセージを確認してください。**<br>
                詳細: ${error.message || 'JSONファイルに構文エラーがある可能性があります。'}
            </p>`;
        } finally {
            // 成功/失敗に関わらず、プリローダー非表示処理を確実に実行
            hidePreloader(); 
        }
    };

    loadNews();
});