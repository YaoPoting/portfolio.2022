AOS.init({
    easing: 'ease-in-out-sine',
});

new WOW().init();

setInterval(() => {
    document.querySelectorAll('.titleCon .col-4').forEach((element) => {
        element.classList.remove('wow', 'bounceIn');
        void element.offsetWidth;
        element.classList.add('wow', 'bounceIn');
    });
    new WOW().init();
}, 3200);

function scrollToWebsites() {
    const anchor = document.querySelector('.websiteAnchor');
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

