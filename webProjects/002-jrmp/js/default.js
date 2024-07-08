AOS.init({
    easing: 'ease-in-out-sine',
});

$(function () {
    $('.bt2form').click(function() {
        var target = $(this.hash);
        $('html,body').animate({
            scrollTop: target.offset().top /* 增減停留位置 */
        }, 1000);
        return false;
    });
});

var mySwiper = new Swiper ('.swiper', {

    autoplay:true,
    loop: true,
    speed: 1000,

    // 分頁器
    pagination: {
    el: '.swiper-pagination',
    },
    
    // 前進後退按鈕
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    
    },
    
    //斷點
    breakpoints: { 
        320: {
            slidesPerView: 1,
            // spaceBetween: 20,
        },

        768: {
            slidesPerView: 2,
            // spaceBetween: 20,
        },

        992: {
            slidesPerView: 3,
            // spaceBetween: 20,
        }
    }
})