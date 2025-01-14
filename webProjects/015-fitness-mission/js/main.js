AOS.init({
    easing: 'ease-in-out-sine',
});

// document.querySelectorAll('.flipCard').forEach(card => {
//     if (card.querySelector('.flipCardInner')) {
//         card.addEventListener('click', function() {
//             this.classList.toggle('flipped');
//         });
//     }
// });
document.querySelectorAll('.flipCard').forEach(card => {
    if (card.querySelector('.flipCardInner')) {
        card.addEventListener('click', function() {
            // 先將所有卡片恢復到正面
            document.querySelectorAll('.flipCard').forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('flipped');
                }
            });
            // 再翻轉被點擊的卡片
            this.classList.toggle('flipped');
        });
    }
});
