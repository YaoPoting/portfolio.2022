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
    
    $(".menu li[class*='" + current + "']").addClass('active');
    $(".menu li").not("[class*='" + current + "']").removeClass('active');
}

$(document).ready( function() {
    scrollSpy();
});

$(window).scroll( function() {
    scrollSpy();
});

//Swiper
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    slidesPerView: 4,
    slidesPerGroup: 4,
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    breakpoints: {
    0: {
        slidesPerView: 1,
        slidesPerGroup: 1
    },
    992: {
        slidesPerView: 3,
        slidesPerGroup: 3
    },
    1200: {
        slidesPerView: 4,
        slidesPerGroup: 4
    }
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});