AOS.init({
  easing: 'ease-in-out-sine',
});

function createSwiper(selector, delay) {
  return new Swiper(selector, {
    autoplay: {
      delay: delay,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 4000,
    allowTouchMove: false,
    effect: 'fade',
  });
}

const mySwiper1 = createSwiper('.swiper1', 1000);
const mySwiper2 = createSwiper('.swiper2', 3000);
const mySwiper3 = createSwiper('.swiper3', 5000);
const mySwiper4 = createSwiper('.swiper4', 3000);