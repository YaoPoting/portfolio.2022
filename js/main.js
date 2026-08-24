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
    const letterSlots = gsap.utils.toArray(targetSelector);
    const targets = letterSlots.map(slot => slot.querySelector('.kv-letter-glyph'));

    // 沒找到元素時停止，避免後續動畫無法執行
    if (targets.length === 0) {
        console.warn(`找不到動畫元素：${targetSelector}`);
        return;
    }

    // 3. GSAP 首頁式進場：每個字母都有獨立的滑入、翻轉與回彈動作
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
        gsap.set(targets, { clearProps: 'all' });
        return;
    }

    gsap.set(targets, {
        autoAlpha: 1,
        transformPerspective: 750,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity'
    });

    const startIdleMotion = () => {
        const spinTarget = targets[isDesktop ? 1 : 2];
        const bounceTarget = targets[isDesktop ? 4 : 3];

        gsap.set(targets[7], {
            backfaceVisibility: 'visible',
            transformOrigin: '50% 50%',
            transformStyle: 'preserve-3d'
        });

        const idleTimeline = gsap.timeline({ repeat: -1 });

        idleTimeline
            .to(spinTarget, {
                rotationZ: 360,
                duration: 1.2,
                ease: 'power3.inOut',
                transformOrigin: '50% 52%'
            })
            .to(bounceTarget, {
                yPercent: -9,
                rotationZ: -4,
                scale: 1.04,
                duration: 0.28,
                ease: 'power2.out'
            })
            .to(bounceTarget, {
                yPercent: 0,
                rotationZ: 0,
                scale: 1,
                duration: 0.58,
                ease: 'elastic.out(1, 0.45)'
            })
            .to(targets[7], {
                rotationX: 540,
                duration: 1.5,
                ease: 'power2.out'
            })
            .to(targets[7], {
                rotationX: 0,
                duration: 1.5,
                ease: 'power2.out'
            })
            .set(spinTarget, { rotationZ: 0 });
    };

    const introTimeline = gsap.timeline({
        delay: 0.35,
        defaults: { ease: 'power3.out' },
        onComplete: () => {
            gsap.set(targets, { clearProps: 'transform,transformStyle,opacity,visibility,willChange' });
            startIdleMotion();
        }
    });

    introTimeline
        .from(targets[0], {
            yPercent: 115,
            rotationX: -180,
            transformOrigin: '50% 100%',
            duration: 1,
            ease: 'back.out(1.7)'
        }, 0)
        .from(targets[1], {
            xPercent: -160,
            rotationZ: -300,
            scale: 0,
            autoAlpha: 0,
            duration: 1.05,
            ease: 'back.out(1.7)'
        }, 0.18)
        .from(targets[2], {
            yPercent: -120,
            rotationX: 160,
            duration: 0.9,
            ease: 'back.out(1.45)'
        }, 0.52)
        .from(targets[3], {
            yPercent: 115,
            rotationX: -70,
            transformOrigin: '50% 100%',
            duration: 0.88,
            ease: 'back.out(1.45)'
        }, 0.78)
        .from(targets[4], {
            yPercent: 140,
            rotationZ: 45,
            scale: 0,
            duration: 1.05,
            ease: 'elastic.out(1, 0.45)'
        }, 0.62)
        .from(targets[5], {
            yPercent: -130,
            rotationY: -180,
            duration: 0.95,
            ease: 'back.out(1.4)'
        }, 1.02)
        .from(targets[6], {
            yPercent: 120,
            rotationX: -120,
            duration: 0.88
        }, 1.16)
        .from(targets[7], {
            rotationY: -270,
            scale: 0,
            duration: 1.12,
            ease: 'back.out(1.8)'
        }, 1.32)
        .from(targets[8], {
            xPercent: 150,
            rotationZ: 120,
            scale: 0.2,
            duration: 1.25,
            ease: 'elastic.out(1, 0.42)'
        }, 1.2);
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
        percentPosition: true,
        initLayout: false
    });

    let layoutFrame;
    const refreshLayout = () => {
        window.cancelAnimationFrame(layoutFrame);
        layoutFrame = window.requestAnimationFrame(() => {
            msnry.layout();
            window.ScrollTrigger?.refresh();
        });
    };

    // 先取得首批圖片的正確高度，再開始監聽無限捲動，避免兩套排版同時執行。
    imagesLoaded(grid).on('always', () => {
        msnry.layout();
        grid.classList.remove('are-images-unloaded');
        window.ScrollTrigger?.refresh();

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

        // Infinite Scroll 會等新圖片載入後交給 Masonry；完成追加後再同步頁面高度。
        infScroll.on('append', refreshLayout);
    });

    // 瀏覽器縮放、字體或容器寬度改變時，確保欄位不會保留舊座標。
    if ('ResizeObserver' in window) {
        let observedGridWidth = Math.round(grid.getBoundingClientRect().width);
        const gridResizeObserver = new ResizeObserver(([entry]) => {
            const nextWidth = Math.round(entry.contentRect.width);
            if (nextWidth === observedGridWidth) return;

            observedGridWidth = nextWidth;
            refreshLayout();
        });
        gridResizeObserver.observe(grid);
    } else {
        window.addEventListener('resize', refreshLayout);
    }
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
