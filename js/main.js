// 滾動到指定區塊的通用函數
const scrollToSection = selector => document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

// 綁定滾動事件
document.querySelectorAll('.pointer[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => scrollToSection(btn.dataset.scroll));
});

// KV
window.addEventListener("load", () => {
    // 1. 生成煙霧效果
    const smokeContainer = document.getElementById("smokeContainer");

    if (smokeContainer) {
        for (let i = 0; i < 60; i++) {
            const smoke = document.createElement("div");
            smoke.className = "smoke";
            smokeContainer.appendChild(smoke);
        }
    }

    // 2. 取得目前裝置要動畫的文字
    const isDesktop = window.innerWidth >= 992;
    const targetSelector = isDesktop ? ".letter" : ".letterSP";
    const targets = gsap.utils.toArray(targetSelector);

    // 沒找到元素時停止，避免後續動畫無法執行
    if (targets.length === 0) {
        console.warn(`找不到動畫元素：${targetSelector}`);
        return;
    }

    // 3. 第二階段：進場完成後，持續播放縮放動畫
    const loopTimeline = gsap.timeline({
        paused: true,
        repeat: -1,
        repeatDelay: 0.5
    });

    loopTimeline.to(targets, {
        duration: 0.35,
        scale: 0.65,
        ease: "power2.out",
        stagger: 0.15
    });

    loopTimeline.to(targets, {
        duration: 0.7,
        scale: 1,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.15
    }, "<+=0.15");

    // 4. 第一階段：只播放一次原本的進場動畫
    const introTimeline = gsap.timeline({
        delay: 0.7,
        onComplete: () => {
            loopTimeline.play();
        }
    });

    introTimeline.from(targets, {
        duration: 1,
        y: 10,
        scale: 1.3,
        opacity: 0,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.2
    });
});

// nav
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.myNav');

    if (navbar) {
        navbar.classList.toggle('sticky', navbar.getBoundingClientRect().top <= 0);
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
    // Split the heading into accessible, individually animated letters.
    const aboutPopTexts = gsap.utils.toArray('[data-pop-text]');
    const aboutPopLetters = [];

    aboutPopTexts.forEach((element) => {
        const text = Array.from(element.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent)
            .join('')
            .trim();

        element.setAttribute('aria-label', text);

        Array.from(element.childNodes).forEach((node) => {
            if (node.nodeType !== Node.TEXT_NODE) return;

            const fragment = document.createDocumentFragment();
            Array.from(node.textContent).forEach((character) => {
                const letter = document.createElement('span');
                letter.className = 'about-pop-letter';
                letter.setAttribute('aria-hidden', 'true');
                letter.textContent = character === ' ' ? '\u00a0' : character;
                fragment.appendChild(letter);
                aboutPopLetters.push(letter);
            });
            node.replaceWith(fragment);
        });
    });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(aboutPopLetters,
            {
                yPercent: 115,
                scale: 0.15,
                rotation: () => gsap.utils.random(-24, 24),
                opacity: 0
            },
            {
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top 72%',
                    once: true
                },
                yPercent: 0,
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 1.15,
                stagger: { each: 0.075, from: 'start' },
                ease: 'elastic.out(1, 0.48)',
                clearProps: 'transform,opacity'
            }
        );
    }

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

// Taipei clock
const taipeiTime = document.getElementById('taipei-time');

if (taipeiTime) {
    const taipeiTimeFormatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Taipei',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    });

    const updateTaipeiTime = () => {
        taipeiTime.textContent = `${taipeiTimeFormatter.format(new Date())} TPE`;
    };

    updateTaipeiTime();
    window.setInterval(updateTaipeiTime, 1000);
}

// Tally iframe 懶載入：等 Modal 打開才載入，避免首屏浪費資源
document.getElementById('contactModal')?.addEventListener('show.bs.modal', function () {
    const iframe = this.querySelector('iframe[data-src]');
    if (iframe && !iframe.src.includes('tally.so')) {
        iframe.src = iframe.dataset.src;
    }
}, { once: false });
