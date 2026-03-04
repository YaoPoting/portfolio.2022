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
        y: 10,
        scale: 1.3,
        opacity: 0,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.2
    }, "+=0.7"); // 第一次播放時，延遲 0.7 秒開始
});

// nav
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.myNav');
    const navBounding = navbar.getBoundingClientRect();

    if (navBounding.top <= 0) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// 膠帶動畫
const highlight = document.querySelector('.highlight');

if (highlight) {
    let isAnimating = false;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                // 防止動畫進行中重複觸發
                if (entry.isIntersecting && !isAnimating) {
                    isAnimating = true;
                    highlight.classList.remove('animate');

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            highlight.classList.add('animate');
                            highlight.addEventListener('animationend', () => {
                                isAnimating = false;
                            }, { once: true });
                        });
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '0px 0px -80px 0px'
        }
    );

    observer.observe(highlight);
}

// GSAP 統一初始化
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ===== ABOUT =====
    // 1. 固定區塊
    ScrollTrigger.create({
        trigger: ".about",
        start: "top top",
        end: "bottom top",
        pinSpacing: false,
        invalidateOnRefresh: true
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 200);
    });

    // 3. 標題和裝飾元素動畫
    gsap.from(".aboutFs, .zackFs, .portfolioTape", {
        scrollTrigger: {
            trigger: ".about",
            start: "top 90%",
            end: "top 20%",
            scrub: 2
        },
        x: -100,
        opacity: 0,
        stagger: 0.1,
        ease: "none"
    });

    // ===== WEB CARDS =====
    gsap.utils.toArray(".cardStyle").forEach((card) => {
        gsap.fromTo(card,
            {
                y: 100,
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "top 40%",
                    scrub: 1
                },
                y: 0,
                opacity: 1,
                ease: "none"
            }
        );
    });
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

    const infScroll = new InfiniteScroll(grid, {
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

// Tally iframe 懶載入：等 Modal 打開才載入，避免首屏浪費資源
document.getElementById('contactModal')?.addEventListener('show.bs.modal', function () {
    const iframe = this.querySelector('iframe[data-src]');
    if (iframe && !iframe.src.includes('tally.so')) {
        iframe.src = iframe.dataset.src;
    }
}, { once: false });
