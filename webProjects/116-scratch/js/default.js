AOS.init({
    easing: 'ease-in-out-sine',
});

var mySwiper = new Swiper ('.swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable :true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});