AOS.init({
    easing: 'ease-in-out-sine',
});

function scrollToForm() {
    const anchor = document.querySelector('.formAnchor');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
