AOS.init({
    easing: 'ease-in-out-sine',
});

new WOW().init();

function scrollToMyform() {
    const anchor = document.getElementById('myform');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
}