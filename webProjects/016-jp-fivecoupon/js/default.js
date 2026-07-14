//GSAP
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// hero highlight
gsap.fromTo(
  '.hero .highlight',
  {
    y: 40,
    scale: 0.25,
    autoAlpha: 0,
    transformOrigin: 'center bottom',
  },
  {
    y: 0,
    scale: 1,
    autoAlpha: 1,
    duration: 0.55,
    ease: 'back.out(1.7)',
    stagger: 0.14,
    delay: 0.2,
  }
);

// form pop
gsap.fromTo(
  '.fillform .form-pop',
  {
    y: 80,
    autoAlpha: 0,
  },
  {
    y: 0,
    autoAlpha: 1,
    duration: 1,
    ease: 'back.out(1.6)',
    stagger: 0.16,
    scrollTrigger: {
      trigger: '.fillform',
      start: 'top 75%',
      once: true,
    },
  }
);

// gsap-up
gsap.utils.toArray('.gsap-up').forEach((el) => {
  const shouldFade = el.classList.contains('gsap-fade');
  const fadeOptions = shouldFade ? { autoAlpha: 0 } : {};
  const visibleOptions = shouldFade ? { autoAlpha: 1 } : {};

  gsap.fromTo(
    el,
    {
      y: 100,
      ...fadeOptions,
    },
    {
      y: 0,
      ...visibleOptions,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: 'top 55%',
        scrub: true,
      },
    }
  );
});

// ways title letters
const waysTitle = document.querySelector('.ways-sticky .title');

if (waysTitle) {
  waysTitle.innerHTML = waysTitle.innerHTML
    .split('<br>')
    .map((line) => [...line].map((char) => `<span class="char">${char}</span>`).join(''))
    .join('<br>');

  gsap.fromTo(
    '.ways-sticky .title .char',
    {
      y: 60,
      scale: 0.25,
      autoAlpha: 0,
      rotation: 8,
      transformOrigin: 'center bottom',
    },
    {
      y: 0,
      scale: 1,
      autoAlpha: 1,
      rotation: 0,
      duration: 0.55,
      ease: 'back.out(1.8)',
      stagger: 0.08,
      scrollTrigger: {
        trigger: waysTitle,
        start: 'top 75%',
        once: true,
      },
    }
  );
}

//plans
gsap.set(".plans-bg", {
  xPercent: -50,
  yPercent: -50,
  transformOrigin: "center center",
});

gsap.fromTo(".plans-bg",
  { scale: 0 },
  {
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".plans",
      start: "top bottom",   // 區塊進場開始
      end: "top center",  // 置中時擴張完成
      scrub: true            // 跟著捲動進度走(關鍵)
    }
  }
);

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

//swiper
// ① 每張圖對應的文字內容(順序對應 slide)
const captions = [
  {
    btn: "會話課程",
    desc: "循序漸進且分級學習，有效強化聽、說、讀、寫，迅速提升日語力！",
  },
  {
    btn: "主題課程",
    desc: "依據程度選擇【旅遊】、【商務】等主題式課程，開口說日文更容易！",
  },
  {
    btn: "檢定認證",
    desc: "針對考照需求者推出【日文檢定】課程，一次掌握JLPT日檢攻略！",
  },
];

const btnEl  = document.getElementById("caption-btn");
const descEl = document.getElementById("caption-desc");

// ② 更新文字(含淡出→換字→淡入)
function updateCaption(index) {
  const data = captions[index];
  if (!data) return;

  btnEl.classList.add("is-fading");
  descEl.classList.add("is-fading");

  setTimeout(() => {
    btnEl.textContent  = data.btn;
    descEl.textContent = data.desc;
    btnEl.classList.remove("is-fading");
    descEl.classList.remove("is-fading");
  }, 350); // 與 CSS transition 時間一致
}

// Swiper
const swiper = new Swiper(".coverSwiper", {
  effect: "slide",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 0,
  loop: true,
  loopAdditionalSlides: 3,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  on: {
    // ④ 切換時觸發(用 realIndex 才能對應 loop 後的真實順序)
    slideChange: function () {
      updateCaption(this.realIndex);
    },
    // 初始化時先顯示第一張的文字
    init: function () {
      updateCaption(this.realIndex);
    },
  },
});
