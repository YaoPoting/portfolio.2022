AOS.init({
    easing: 'ease-in-out-sine',
});

new WOW().init();

function scrollToWebsites() {
    const anchor = document.querySelector('.website');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.onscroll = function() {
    var myNav = document.querySelector('.myNav');
    var navPosition = myNav.getBoundingClientRect();

    if (navPosition.top <= 0) {
        myNav.style.backgroundColor = "#FFB000";
        myNav.style.color = "#FFFFFF";
    } else {
        myNav.style.backgroundColor = "";
        myNav.style.color = "";
    }
};