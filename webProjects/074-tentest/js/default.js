AOS.init();

let selectedLanguageGlobal = null;

function languageSelection(language) {
    selectedLanguageGlobal = language;
    selectLanguage(language);
}

//tab
function selectLanguage(language) {
    // background color
    const buttons = document.querySelectorAll('.btCon');
    buttons.forEach(button => {
        button.classList.remove('selected');
    });

    const selectedButton = document.querySelector(`.hov${language.toUpperCase()}`);
    if (selectedButton) {
        selectedButton.classList.add('selected');
    }

    // open modal
    const formModal = window.modals.formModal;
    if (formModal && typeof formModal.show === 'function') {
        formModal.show();
    }
}

function openQuesAndScroll() {

    modals.formModal.hide();

    //open question
    const languages = document.querySelectorAll('.questionCon > div');
    languages.forEach(lang => lang.style.display = 'none');
    const selectedLanguage = document.querySelector(`.${selectedLanguageGlobal}`);
    selectedLanguage.style.display = 'block';
    document.querySelector('.questionCon').style.display = 'block';

    //scroll
    function scrollToQuestion() {
        const anchor = document.querySelector('.questionCon');
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    scrollToQuestion();
}

// input color
function selectOption(element) {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(answer => {
        answer.classList.remove('selected');
    });

    element.classList.add('selected');

    const radioInput = element.querySelector('input[type="radio"]');
    if (radioInput) {
        radioInput.checked = true;
    }
}

//Modal
document.addEventListener("DOMContentLoaded", function() {

    const modals = {
        formModal: new bootstrap.Modal(document.getElementById('form_modal')),
        loginModal: new bootstrap.Modal(document.getElementById('login_modal')),
        forgotAcModal: new bootstrap.Modal(document.getElementById('forgotAc_modal')),
        forgotPwModal: new bootstrap.Modal(document.getElementById('forgotPw_modal')),
        scoreModal: new bootstrap.Modal(document.getElementById('score_modal'))
    };

    document.getElementById('openLogin_form').addEventListener('click', function() {
        modals.formModal.hide();
        modals.loginModal.show();
    });

    document.getElementById('forgotAc').addEventListener('click', function() {
        modals.loginModal.hide();
        modals.forgotAcModal.show();
    });

    document.getElementById('forgotPw').addEventListener('click', function() {
        modals.loginModal.hide();
        modals.forgotPwModal.show();
    });

    document.getElementById('openLogin_ac').addEventListener('click', function() {
        modals.forgotAcModal.hide();
        modals.loginModal.show();
    });

    document.getElementById('openLogin_pw').addEventListener('click', function() {
        modals.forgotPwModal.hide();
        modals.loginModal.show();
    });

    document.getElementById('backForm').addEventListener('click', function() {
        modals.loginModal.hide();
        modals.formModal.show();
    });

    window.modals = modals;

    //Swiper
    const SwiperUS_L1 = new Swiper ('.swiperUS_L1', {

        autoHeight: true,
        slidesPerView: 1,
    
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    
        effect : 'fade',
        fadeEffect: {
          crossFade: true,
        },
    
        on: {
            slideChange: function () {
                const isLastSlide = this.activeIndex === this.slides.length - 1;
    
                if (isLastSlide) {
                    this.navigation.$nextEl.addClass('swiper-button-hidden');
                    setTimeout(function() {
                        modals.scoreModal.show();
                    }, 500);

                } else {
                    this.navigation.$nextEl.removeClass('swiper-button-hidden');
                }
            }
        }
    })

});