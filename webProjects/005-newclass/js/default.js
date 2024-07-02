AOS.init({
    easing: 'ease-in-out-sine',
});

/* scrollSpy 判斷頁面位置，並顯示作用在選單上  */
function scrollSpy() {
    var itemNum = $('.table-list .item').length;
    var itemArr = [];
    for (z = 1; z < itemNum + 1; z++ ){
        var x = String(z);
        x = x.padStart(2, '0');
        itemArr.push('class_' + x);        
    }
    var current;
    for (var i = 0; i < itemArr.length; i++) {
        if ( $('#'+itemArr[i]).offset().top <= $(window).scrollTop() + 80 ) {
            current = itemArr[i];
        }
    }
    $(".menu a[href='#"+current+"']").addClass('active');
    $(".menu a").not("a[href='#"+current+"']").removeClass('active');
}

$(document).ready( function() {
    scrollSpy();
});

$(window).scroll( function() {
    scrollSpy();
});

// Swiper
var mySwiper = new Swiper ('.swiper', {
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
    loop: true,
    speed: 2000,
    slidesPerView: 1,

    breakpoints: { 
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        },
        1400: {
            slidesPerView: 5,
        },
    },
});