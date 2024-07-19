AOS.init({
    easing: 'ease-in-out-sine',
});

new WOW().init();

setInterval(() => {
    new WOW().init();
}, 6000);

function scrollToForm() {
    const anchor = document.querySelector('.kv');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

var mySwiper = new Swiper ('.swiper', {
    loop: true,
    grabCursor: true,
    autoplay: {
        delay: 700,
    },
    speed: 1000,
    slidesPerView: 1.5,
    spaceBetween: 30,
 
    breakpoints: {
        992: {
            slidesPerView: 2.5,
        },
        1200: {
            slidesPerView: 3.5,
        },
    },
});