// 初始化 AOS 和 WOW
AOS.init({ easing: 'ease-in-out-sine' });
new WOW().init();

// 標題動畫循環
setInterval(() => {
    const titleElements = document.querySelectorAll('.titleCon .col-4');
    titleElements.forEach(el => {
        el.classList.remove('wow', 'bounceIn');
        void el.offsetWidth;
        el.classList.add('wow', 'bounceIn');
    });
    new WOW().init();
}, 3200);

// 滾動到指定區塊的通用函數
const scrollToSection = selector => document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

// 綁定滾動事件
document.querySelectorAll('.pointer[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.scroll));
});

// 導航事件
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.myNav');
    const kvHeight = document.querySelector('.kv')?.offsetHeight || 0;
    navbar.classList.toggle('sticky', window.scrollY > kvHeight);
});

// 頁面載入時設置背景並生成煙霧效果
window.addEventListener('load', () => {
    document.body.style.backgroundColor = '#FFB000';
    const smokeContainer = document.getElementById('smokeContainer');
    for (let i = 0; i < 60; i++) {
        smokeContainer.appendChild(Object.assign(document.createElement('div'), { className: 'smoke' }));
    }
});

// Infinite Scroll 和 Masonry 初始化
const grid = document.querySelector('.image-grid');
if (grid) {
    const msnry = new Masonry(grid, {
        itemSelector: '.image-grid__item',
        columnWidth: '.image-grid__col-sizer',
        gutter: '.image-grid__gutter-sizer',
        percentPosition: true
    });

    const updateLayout = items => {
        imagesLoaded(grid, () => {
            grid.classList.remove('are-images-unloaded');
            items ? msnry.appended(items) : msnry.layout();
        });
    };

    updateLayout();

    new InfiniteScroll(grid, {
        path: function() {
            return `./page${this.pageIndex + 1}.html`;
        },
        append: '.image-grid__item',
        outlayer: msnry,
        history: false,
        status: '.scroller-status',
        scrollThreshold: 400
    });
}

// 阻止 pagination__next 默認行為
document.querySelector('.pagination__next')?.addEventListener('click', e => {
    e.preventDefault();
});