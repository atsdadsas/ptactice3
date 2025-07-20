// ai.js の内容を以下の完全な形で記述してください

// --- 1. モーダル関連の要素を作成し、DOMに追加する部分 ---
const modal = document.createElement('div');
modal.id = 'imageModal';
modal.style.cssText = `
    display: none;
    position: fixed;
// クリックされた画像が最前列に表示する
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.8);
    justify-content: center;
    align-items: center;
`;

const modalContent = document.createElement('img');
modalContent.classList.add('modal-content');
modalContent.style.cssText = `
    margin: auto;
    display: block;
    max-width: 90%;
    max-height: 90%;
`;

const closeBtn = document.createElement('span');
closeBtn.classList.add('close-button');
closeBtn.innerHTML = '&times;'; // '×'記号
closeBtn.style.cssText = `
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
`;

modal.appendChild(closeBtn);
modal.appendChild(modalContent);
document.body.appendChild(modal); // モーダルをbodyに追加


// --- 2. 画像クリックでモーダル表示するイベントリスナー部分 ---
document.querySelectorAll('.image-grid img').forEach(image => {
    image.addEventListener('click', function() {
        console.log('画像がクリックされました:', this.src); // この行はデバッグ用なので残しておいても良い
        modal.style.display = 'flex'; // ★ここで modal 変数が定義済みなのでエラーが出なくなる
        modalContent.src = this.src;
    });
});

// 閉じるボタンクリックでモーダル非表示
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// モーダル背景クリックでモーダル非表示
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


// --- 3. その他の機能（スムーズスクロール、ヘッダーの変更、フェードインアニメーション）---

// スムーズスクロール
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('.header-container').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});
// ↓消したら治る
// header-containerをheaderに代入している
const header = document.querySelector('.header-container');
// スクロールのしきい値を50にしている
const scrollThreshold = 50;
// スクロールす度に（）が実行される
window.addEventListener('scroll', function() {
    if (window.pageYOffset > scrollThreshold) {
        // header.style.position = 'fixed';
        header.style.top = '0';
        header.style.width = '100%';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        header.style.zIndex = '999';
    } else {
        header.style.position = 'static';
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        header.style.zIndex = 'auto';
    }
});

// Intersection Observer API を使ったフェードイン
const fadinElements = document.querySelectorAll('.gallery, #profile, #contact');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadinElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});


// ビューポートの高さと幅の取得
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
// 開発者むけに取得した値を表示。書かなくても問題ない。
console.log(`ビューポートの幅: ${viewportWidth}px`);
console.log(`ビューポートの高さ: ${viewportHeight}px`);


document.addEventListener('DOMContentLoaded', () => {
    const sizeElement = document.getElementById('viewport-size');
    // webページにif文ないの文言があれば、実行する
    if (sizeElement) {
        sizeElement.textContent = `現在の画面サイズ: ${viewportWidth}px (幅) x ${viewportHeight}px (高さ)`;
    }
});