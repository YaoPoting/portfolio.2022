AOS.init({
    easing: 'ease-in-out-sine',
});

new WOW().init();

function scrollToWebsites() {
    const anchor = document.querySelector('.website');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// window.onscroll = function() {
//     var myNav = document.querySelector('.myNav');
//     var navPosition = myNav.getBoundingClientRect();

//     if (navPosition.top <= 0) {
//         myNav.style.backgroundColor = "#FFB000";
//         myNav.style.color = "#FFFFFF";
//     } else {
//         myNav.style.backgroundColor = "#FFFFFF";
//         myNav.style.color = "#000000";
//     }
// };

// window.addEventListener('scroll', function() {
//     var navbar = document.querySelector('.myNav');
//     var hero = document.querySelector('.hero');
//     var heroHeight = hero.offsetHeight;

//     if (window.scrollY > heroHeight) {
//         navbar.classList.add('sticky');
//     } else {
//         navbar.classList.remove('sticky');
//     }
// });

window.onscroll = function() {
    var navbar = document.querySelector('.myNav');
    var kv = document.querySelector('.kv');
    var kvHeight = kv.offsetHeight;

    if (window.scrollY > kvHeight) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
};