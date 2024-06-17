AOS.init({
    easing: 'ease-in-out-sine',
});

//側邊按鈕
$(document).ready(function () {
    $(".sideButton").click(function () {
        $("html,body").animate({ scrollTop: $("#myform").offset().top }, 0);
    });
}); 

//聲音播放
var loveEngRec = new Audio('recording/loveEng.mp3');
document.getElementById('loveEngPlay').addEventListener('click', function() {
    loveEngRec.play();
});
var loveJapRec = new Audio('recording/loveJap.mp3');
document.getElementById('loveJapPlay').addEventListener('click', function() {
    loveJapRec.play();
});
var loveSpaRec = new Audio('recording/loveSpa.mp3');
document.getElementById('loveSpaPlay').addEventListener('click', function() {
    loveSpaRec.play();
});
var loveKorRec = new Audio('recording/loveKor.mp3');
document.getElementById('loveKorPlay').addEventListener('click', function() {
    loveKorRec.play();
});
var loveFreRec = new Audio('recording/loveFre.mp3');
document.getElementById('loveFrePlay').addEventListener('click', function() {
    loveFreRec.play();
});
var loveGerRec = new Audio('recording/loveGer.mp3');
document.getElementById('loveGerPlay').addEventListener('click', function() {
    loveGerRec.play();
});
// Swiper
var mySwiper = new Swiper ('.swiper', {
    autoplay:true,
    loop: true,
    speed: 1000,
    centeredSlides: true,
    //斷點
    breakpoints: { 
        320: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 6,
            spaceBetween: 20,
        }
    }
})