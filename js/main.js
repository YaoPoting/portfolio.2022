// 初始化 AOS
AOS.init({ easing: 'ease-in-out-sine', once: true });

// 滾動到指定區塊的通用函數
const scrollToSection = selector => document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

// 綁定滾動事件
document.querySelectorAll('.pointer[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.scroll));
});

//KV
window.addEventListener('load', () => {
    // 1. 立即生成煙霧效果
    const smokeContainer = document.getElementById('smokeContainer');
    if (smokeContainer) {
        for (let i = 0; i < 60; i++) {
            smokeContainer.appendChild(Object.assign(document.createElement('div'), { className: 'smoke' }));
        }
    }
    // 2. 執行 GSAP 文字動畫
    const isDesktop = window.innerWidth >= 992;
    const targets = isDesktop ? ".letter" : ".letterSP";

    const kvTimeline = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.5
    });

    kvTimeline.from(targets, {
        duration: 1,
        y: 100,
        scale: 1.3,
        opacity: 0,
        ease: "elastic.out(1, 1)",
        stagger: 0.2
    }, "+=0.7"); // 第一次播放時，延遲 0.7 秒開始
});

// nav
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.myNav');
    const kvHeight = document.querySelector('.kv')?.offsetHeight || 0;
    navbar.classList.toggle('sticky', window.scrollY > kvHeight);
});

// 膠帶動畫
const highlight = document.querySelector('.highlight');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // 移除 & 重新加 class，觸發動畫
            highlight.classList.remove('animate');
            void highlight.offsetWidth; // 強制 reflow
            highlight.classList.add('animate');
        }});
    },
    {
        threshold: 0.5 //進入畫面50%即觸發動畫
    }
);

if (highlight) {observer.observe(highlight);}




//about-works視差
document.addEventListener('DOMContentLoaded', () => {
    // 註冊插件
    gsap.registerPlugin(ScrollTrigger);
    
    // 讓 GSAP 處理這段動畫
    ScrollTrigger.create({
        trigger: ".about",
        start: "top top", 
        end: "bottom top", // 當 about 底部碰到視窗頂部時結束
        pin: true, // 固定 about
        pinSpacing: false, // ★ 關鍵：不保留佔位空間，讓下方的 works 自然往上流動覆蓋
        scrub: true
    });
    
    // 如果你希望能看到 works 有視差效果（例如慢一點移動），可以單獨加動畫，
    // 但最簡單的「蓋過去」效果，只需要上面的 pin: true 搭配 pinSpacing: false 即可。
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
            
            ScrollTrigger.refresh(); 
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