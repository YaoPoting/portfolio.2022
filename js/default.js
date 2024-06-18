AOS.init({
    easing: 'ease-in-out-sine',
});

new WOW().init();

function scrollToWebsites() {
    const anchor = document.querySelector('.website');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.myNav');
    var kv = document.querySelector('.kv');
    var kvHeight = kv.offsetHeight;

    if (window.scrollY > kvHeight) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});