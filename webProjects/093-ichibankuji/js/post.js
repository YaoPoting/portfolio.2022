//Swiper
const badgeSwiper = new Swiper(".badgeSwiper", {

  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },

  loop: false,
  slidesPerView: 2,
  slidesPerGroup: 2,

  grid: {
    rows: 3,
    fill: 'row',
  },

  breakpoints: {
    992: {
      slidesPerView: 6,
      slidesPerGroup: 6,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

//GSAP
gsap.from(".fixed-drawingBt", {
  scrollTrigger: {
    trigger: ".people",
    start: "top bottom",
    toggleActions: "play none none reverse",
  },
  y: 65,
  duration: 0.6
});

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.go_game');
    const target = document.querySelector('.game');

    if (btn && target) {
        btn.addEventListener('click', () => {
            target.scrollIntoView({ behavior: 'auto' }); 
        });
    }
});

ScrollTrigger.create({
  trigger: ".footer",
  start: "top bottom",
  end: "top bottom-=100",
  scrub: 0,
  onUpdate: (self) => {
    const moveDistance = 100 * self.progress;
    document.querySelector(".fixed-drawingBt").style.bottom = moveDistance + "px";
  }
});

gsap.set(".bounce-up", { 
    opacity: 0, 
    y: 100
});

gsap.to(".bounce-up", {
    opacity: 1,
    y: 0,
    duration: 0.4,
    scrollTrigger: {
        trigger: ".bounce-up",
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
    }
});

const items = document.querySelectorAll('.anmt');

items.forEach((item, index) => {

  const isLeft = index % 2 === 0;
  
  gsap.from(item, {
    x: isLeft ? -200 : 200,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      end: "top 60%",
      scrub: true
    }
  });
});

function addHoverEffect(element) {
    const animation = gsap.to(element, {
        scale: 1.1,
        rotate: -3,
        duration: 0.3,
        paused: true,
        ease: "power1.out"
    });
    element.addEventListener("mouseenter", () => animation.play());
    element.addEventListener("mouseleave", () => animation.reverse());
}

// 生成200支籤
const lotContainer = document.getElementById('lotContainer');
const modalNumber = document.getElementById('modalNumber');

for (let i = 1; i <= 1200; i++) {
    const lotItem = document.createElement('div');
    lotItem.className = 'col-lot';
    lotItem.setAttribute('data-bs-toggle', 'modal');
    lotItem.setAttribute('data-bs-target', '#drawing');
    lotItem.setAttribute('data-number', i);
    
    lotItem.innerHTML = `
        <div class="lot-number">${i}</div>
        <img class="w-100" src="images/lot-number-bg.png">
    `;
    
    lotItem.addEventListener('click', function() {
        const number = this.getAttribute('data-number');
        modalNumber.textContent = number;
    });
    
    lotContainer.appendChild(lotItem);

    addHoverEffect(lotItem);
}

document.querySelectorAll('.col-lot').forEach(el => {
    if (!el.hasAttribute('data-number')) {
        addHoverEffect(el);
    }
});


//籤翻轉效果
document.addEventListener('DOMContentLoaded', function() {
  const gameContainer = document.querySelector('.game-container');
  const flippingPage = document.getElementById('cover');
  
  if (!gameContainer || !flippingPage) return;
  
  let isDragging = false;
  let isFlipped = false;
  let isHovering = false;
  let currentAngle = 0;
  
  const isMobile = () => window.innerWidth <= 991;
  
  function getProgress(e) {
    const rect = gameContainer.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    if (isMobile()) {
      // 手機版：從下往上拖曳（Y 軸反向計算）
      return Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));
    } else {
      // 桌面版：根據 X 軸計算進度
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    }
  }
  
  // 更新角度和陰影
  function updateFlip(angle) {
    currentAngle = angle;
    
    if (isMobile()) {
      // 手機版向上翻：使用 rotateX（正值）
      const shadowY = -Math.abs(angle) / 12; // 陰影向上
      const shadowBlur = 6 + Math.abs(angle) / 15;
      const shadowOpacity = 0.2 + (Math.abs(angle) / 60) * 0.3;
      
      flippingPage.style.transform = `rotateX(${angle}deg)`;
      flippingPage.style.filter = `drop-shadow(0px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}))`;
    } else {
      // 桌面版向右翻：使用 rotateY
      const shadowX = -angle / 3;
      const shadowY = angle / 12;
      const shadowBlur = 6 + angle / 15;
      const shadowOpacity = 0.2 + (angle / 60) * 0.3;
      
      flippingPage.style.transform = `rotateY(${angle}deg)`;
      flippingPage.style.filter = `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}))`;
    }
  }
  
  // 完成翻頁
  function completeFlip() {
    isDragging = false;
    isFlipped = true;
    isHovering = false;
    flippingPage.classList.add('flipped');
    gameContainer.style.cursor = 'default';
    // 隐藏数字
    document.getElementById('modalNumber').classList.add('d-none');

    setTimeout(() => {
      flippingPage.style.transform = '';
      flippingPage.style.filter = '';
    }, 50);
  }
  
  // 重置
  function resetFlip() {
    isDragging = false;
    isHovering = false;
    if (isMobile()) {
      flippingPage.style.transform = 'rotateX(0deg)';
    } else {
      flippingPage.style.transform = 'rotateY(0deg)';
    }
    flippingPage.style.filter = 'none';
    if (!isMobile()) gameContainer.style.cursor = 'grab';
  }
  
  // === Hover 效果(桌面版) ===
  gameContainer.addEventListener('mouseenter', function() {
    if (isFlipped || isDragging || isMobile()) return;
    isHovering = true;
    flippingPage.style.transition = 'transform 0.3s ease-out, filter 0.3s ease-out';
    // 桌面版 hover 角度
    updateFlip(20);
  });
  
  gameContainer.addEventListener('mouseleave', function() {
    if (isFlipped || isDragging) return;
    if (isHovering) {
      isHovering = false;
      flippingPage.style.transition = 'transform 0.3s ease-out, filter 0.3s ease-out';
      resetFlip();
    }
  });
  
  // === 拖動事件 ===
  function onStart(e) {
    if (isFlipped) return;
    isDragging = true;
    isHovering = false;
    flippingPage.style.transition = 'transform 0.05s ease-out, filter 0.05s ease-out';
    if (!isMobile()) gameContainer.style.cursor = 'grabbing';
    e.preventDefault();
  }
  
  function onMove(e) {
    if (!isDragging || isFlipped) return;
    const progress = getProgress(e);
    // 統一使用 60
    const angle = progress * progress * 60;
    updateFlip(angle);
    if (e.touches) e.preventDefault();
  }
  
  function onEnd(e) {
    if (!isDragging || isFlipped) return;
    flippingPage.style.transition = 'transform 0.3s ease-out, filter 0.3s ease-out';
    
    // 統一判斷 >= 50
    if (currentAngle >= 50) {
      completeFlip();
    } else {
      resetFlip();
    }
  }
  
  function onCancel() {
    if (isDragging && !isFlipped) {
      flippingPage.style.transition = 'transform 0.3s ease-out, filter 0.3s ease-out';
      currentAngle >= 50 ? completeFlip() : resetFlip();
    }
  }
  
  // 綁定事件
  gameContainer.addEventListener('mousedown', onStart);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
  
  gameContainer.addEventListener('touchstart', onStart, { passive: false });
  document.addEventListener('touchmove', onMove, { passive: false });
  gameContainer.addEventListener('touchend', onEnd);
  gameContainer.addEventListener('touchcancel', onCancel);
  
  // 初始化
  if (!isMobile()) gameContainer.style.cursor = 'grab';
  
  // 視窗大小變化
  window.addEventListener('resize', () => {
    if (!isFlipped && !isDragging && !isHovering) resetFlip();
  });
});