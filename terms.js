/**
 * 篠ノ井乗務区 - 総合規約＆プライバシーポリシー統合データおよびロジックスクリプト
 */

// ==========================================
// 1. 全ポリシー・全規約データ構造
// ==========================================
const termsData = {
  creationDate: "2025年7月20日",
  lastUpdate: "2026年8月20日",
  chapters: [
    {
      id: "official-disclaimer",
      title: "前提事項：実在団体との関係性",
      body: `
        <p>当プロジェクト「篠ノ井乗務区」は、鉄道趣味コンテンツおよびWeb開発ツール（撮影地光線状態シミュレーター、発車標再現ツール等）を提供する<strong>個人有志による非公式なファンプロジェクト</strong>です。</p>
        <p>東日本旅客鉄道株式会社（JR東日本）、日本貨物鉄道株式会社（JR貨物）、しなの鉄道株式会社など、実在する一切の鉄道事業者・企業・公的機関とは直接・間接を問わず一切無関係であり、公式な委託・連携関係等も存在しません。</p>
      `
    },
    {
      id: "privacy",
      title: "第1章：プライバシーポリシー（個人情報保護方針）",
      body: `
        <h3>第1条（収集する情報と利用目的）</h3>
        <p>当サイトでは、サービスの提供・利便性向上・アカウント管理のために以下の情報を収集します。</p>
        <ul>
          <li><strong>アカウント基本情報：</strong> ユーザー名、メールアドレス、生年月日（会員識別および退会手続き時の本人確認に使用します）。</li>
          <li><strong>位置情報（GPS等）：</strong> 「撮影地光線状態シミュレーター」等において、ユーザーの同意に基づき現在地に応じた光線・太陽高度の計算を行う目的で使用します。位置情報はブラウザ内（ローカル）の計算処理にのみ使用され、当区のサーバー上へ保存・蓄積・送信されることは一切ありません。</li>
          <li><strong>お問い合わせ情報：</strong> お問い合わせフォームやSNSのDM等でいただいた連絡先・メッセージ内容は、返信およびサポート業務にのみ使用します。</li>
        </ul>
        <h3>第2条（情報の安全管理）</h3>
        <p>収集した情報はSSL通信により暗号化して保護し、パスワードはハッシュ化等の安全な手法を用いて適切に保存します。</p>
        <h3>第3条（第三者提供の制限）</h3>
        <p>法令に基づく要請がある場合を除き、取得した個人情報を第三者に提供することはありません。</p>
      `
    },
    {
      id: "membership",
      title: "第2章：会員登録制度・限定情報厳秘義務",
      body: `
        <p>当サイトの会員専用コンテンツ、限定公開情報、シミュレーター内部データについて、第三者への開示・公開を固く禁じます。</p>
        <p><span class="important-txt">会員専用情報およびツール結果のSNS等への無断転載、スクリーンショットの外部公開は一切禁止です。</span></p>
        <p>違反が発見された場合、予告なくアカウントの即時停止（BAN）およびアクセス拒否措置、必要に応じた法的措置を講じます。</p>
      `
    },
    {
      id: "comments",
      title: "第3章：コメント・投稿ガイドライン",
      body: `
        <p>当サイト内の掲示板やコメント投稿機能は完全承認制です。以下のいずれかに該当する投稿は、管理者の判断により掲載拒否または削除を行います。</p>
        <ul>
          <li>特定の個人・法人・鉄道事業者に対する誹謗中傷や営業妨害行為</li>
          <li>鉄道現場（駅構内・敷地内・線路沿い等）での立入禁止区域への侵入、危険撮影、マナー違反行為を誘発・助長する内容</li>
          <li>公序良俗に反する内容、スパム投稿、その他運営者が不適切と判断した内容</li>
        </ul>
      `
    },
    {
      id: "response",
      title: "第4章：運営レスポンス方針",
      body: `
        <p>当区への各種お問い合わせについて、すべての問い合わせに対する返信を確約するものではありません。</p>
        <p>特に、公開前の未発表情報、実際の鉄道事業者の運行ダイヤや内部情報に関する質問、マナー違反に関する言及等については回答を差し控えます。</p>
      `
    },
    {
      id: "account-delete",
      title: "第5章：アカウント削除（退会）手続き",
      body: `
        <p>会員登録の削除（退会）をご希望の方は、本人確認のため申請フォームより手続きを行ってください。</p>
        <div class="contact-panel">
          <p style="color:var(--txt); margin-bottom:20px">下記3点を正確に明記して申請してください。<br><strong>1. ユーザー名 / 2. メールアドレス / 3. 生年月日</strong></p>
          <a href="https://shinorail.github.io/main/contact.html" class="btn" target="_blank">退会申請フォームへ</a>
        </div>
      `
    },
    {
      id: "ads-policy",
      title: "第6章：広告配信サービスへの同意",
      body: `
        <p>当サイトでは、サーバー維持費用およびWebツール開発環境の維持のため、忍者AdMax等の第三者配信広告サービスを利用しています。</p>
        <p>利用者は、当サイトを利用することにより、これら広告の表示および広告配信に伴うCookie等の技術利用に同意したものとみなします。</p>
      `
    },
    {
      id: "copyright",
      title: "第7章：知的財産権・転載禁止",
      body: `
        <p>当サイトで公開・提供されている文章、Webツール（シミュレーター等）、デザイン、ソースコード、画像等の知的財産権は篠ノ井乗務区（区長）に帰属します。</p>
        <p>私的使用の範囲を超えた無断での複製、転載、再配布、リバースエンジニアリング、商業利用行為を固く禁止します。</p>
      `
    },
    {
      id: "disclaimer",
      title: "第8章：免責事項",
      body: `
        <p>1. 当サイトで提供する各種シミュレーション結果、発車標表示、掲載情報等の正確性・完全性・有用性・安全性について、運営者は一切の保証を行いません。</p>
        <p>2. 当サイトの利用または利用不能により生じた損害（現地での撮影失敗、事故、交通トラブル、機器の故障等を含む）について、運営者は一切の責任を負いません。</p>
        <p>3. 現地で写真撮影等を行う際は、実際の交通ルール、安全基準、鉄道事業者の指示に従い、常に自己責任にて行動してください。</p>
        <p>4. 当サイトは、予告なくサービスの変更・中断・終了を行うことができるものとします。</p>
      `
    }
  ]
};

// ==========================================
// 2. 画面レンダリング機能（データからDOM生成）
// ==========================================
function renderTermsAndPolicies() {
  const tocList = document.getElementById("toc-list");
  const termsContent = document.getElementById("terms-content");

  if (!tocList || !termsContent) return;

  // 初期化
  tocList.innerHTML = "";
  termsContent.innerHTML = "";

  // 章データをもとに目次と本文を自動構築
  termsData.chapters.forEach(chapter => {
    // 目次（リスト）の生成
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${chapter.id}`;
    link.textContent = chapter.title;
    li.appendChild(link);
    tocList.appendChild(li);

    // 本文（セクション）の生成
    const section = document.createElement("section");
    section.id = chapter.id;

    const h2 = document.createElement("h2");
    h2.textContent = chapter.title;
    section.appendChild(h2);

    const bodyContainer = document.createElement("div");
    bodyContainer.innerHTML = chapter.body;
    section.appendChild(bodyContainer);

    termsContent.appendChild(section);
  });

  // 日付情報の反映
  const dateInfo = document.getElementById("date-info");
  if (dateInfo) {
    dateInfo.innerHTML = `制定：${termsData.creationDate}<br>最終改訂：${termsData.lastUpdate}`;
  }
}

// ==========================================
// 3. ポップアップ＆ローカルストレージ判定機能
// ==========================================
function initConsentModal() {
  const modal = document.getElementById('consent-modal');
  const agreeBtn = document.getElementById('agree-btn');
  const storageKey = 'shinorail_terms_agreed';

  if (!modal || !agreeBtn) return;

  // ローカルストレージで「同意済み」かチェック
  if (localStorage.getItem(storageKey) === 'true') {
    // すでに同意済みの場合はモーダルを表示せず、背景スクロール制限を解除
    modal.classList.remove('is-active');
    document.body.classList.remove('modal-open');
  } else {
    // 未同意の場合はモーダルを表示
    modal.classList.add('is-active');
    document.body.classList.add('modal-open');
  }

  // 同意ボタンクリック時のイベント
  agreeBtn.addEventListener('click', function() {
    // ローカルストレージに記憶
    localStorage.setItem(storageKey, 'true');
    
    // モーダル閉じる＆スクロールロック解除
    modal.classList.remove('is-active');
    document.body.classList.remove('modal-open');
  });
}

// ==========================================
// 4. 初期化実行
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderTermsAndPolicies(); // 規約文章・目次・日付をJSから描画
  initConsentModal();       // ポップアップ・同意判定の実行
});
