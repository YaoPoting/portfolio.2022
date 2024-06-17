AOS.init({
    easing: 'ease-in-out-sine',
});

new WOW().init();

function scrollToWebsites() {
    const anchor = document.querySelector('.website');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.onload = function() {
    var myNav = document.querySelector('.myNav');
    var ticking = false;

    function updateNav() {
        var navPosition = myNav.getBoundingClientRect();

        if (navPosition.top >= 0) {
            myNav.style.backgroundColor = "#FFB000";
            myNav.style.color = "#FFFFFF";
        } else {
            myNav.style.backgroundColor = "#FFFFFF"; // 指定一个非空的背景颜色
            myNav.style.color = "#000000";
        }
        ticking = false;
    }

    window.onscroll = function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    };
};