$(document).ready(function(){
    $(".go_greeting").click(function(){
        $('html, body').stop().animate({scrollTop: $('.greeting').offset().top}, 0);
    });
});


//Swiper
const swiper = new Swiper(".mySwiper", {

  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
    // pauseOnMouseEnter: true,
  },

  loop: true,
  slidesPerView: 2,

  breakpoints: {
    992: {
      slidesPerView: 6,
    },
  }
});

//GSAP
gsap.registerPlugin(ScrollTrigger);

const elements = ".temple, .fishflag,.mountain, .grass-left, .grass-right";

gsap.from(elements, {
    duration: 1.5,
    y: 300,
    opacity: 0,
    ease: "bounce.out",
    stagger: 0.5,
    force3D: true
});

gsap.from(".button", {
    duration: 1.2,
    y: 100,
    opacity: 0,
    ease: "bounce.out",
    delay: 1.8,
    onComplete: function() {
        gsap.to(".button", {
            scale: 0.95,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }
});