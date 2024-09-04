AOS.init({
    easing: 'ease-in-out-sine',
});

function scrollToForm() {
    const anchor = document.querySelector('.formAnchor');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function selected(element) {
    const answerCon = element.closest('.answerCon');
    const answers = answerCon.querySelectorAll('.answer');

    answers.forEach(answer => {
        answer.classList.remove('selected');
    });

    element.classList.add('selected');
    
    const radioInput = element.querySelector('input[type="radio"]');
    if (radioInput) {
        radioInput.checked = true;     
    }
}