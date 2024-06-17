let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // 卡片數字陣列
let cardsFlipped = 0; // 記錄已翻開的卡片數
let drawnCardIndex = -1; // 記錄已抽到的卡片索引

// 隨機洗牌函數
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 頁面載入時初始化遊戲
window.onload = function() {
    cards = shuffleArray(cards); // 洗牌
    displayCards(); // 顯示卡片
};

// 自動發卡
function displayCards() {
    const cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = ''; // 清空卡片容器

    // 動態新增卡片到容器中
    for (let i = 0; i < cards.length; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";

        const backImg = document.createElement("img");
        backImg.className = "back";
        backImg.src = "images/cardBackside.png";
        backImg.alt = "Back";

        const frontImg = document.createElement("img");
        frontImg.className = "front";
        frontImg.src = `images/cardFront_${cards[i]}.png`;
        frontImg.alt = `Front ${cards[i]}`;
        frontImg.style.display = 'none';

        cardDiv.appendChild(backImg);
        cardDiv.appendChild(frontImg);

        cardsContainer.appendChild(cardDiv);
    }

    // 綁定卡片點擊事件
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((card, index) => {
        card.onclick = function() { checkCard(index); };
    });
}

function drawCard(cardIndex) {
    if (cardsFlipped >= 1 || drawnCardIndex !== -1) {
        return;
    }
    cardsFlipped++;
}

function checkCard(cardIndex) {
    if (cardsFlipped >= 1 || drawnCardIndex !== -1) {
        // 如果已經翻過一張卡片或抽過卡片，不進行任何操作
        return;
    }
    // 翻開所抽到的卡片
    const card = document.querySelector(`.card:nth-child(${cardIndex + 1})`);
    const back = card.querySelector('.back');
    const front = card.querySelector('.front');
    back.style.display = 'none';
    front.style.display = 'block';

    // 更新已翻開卡片數
    cardsFlipped++;

    // 更新對應的 Zodiac 數字的 div 的內容並顯示
    const zodiacCourse = document.getElementById(`result_${cards[cardIndex]}`);
    zodiacCourse.style.display = 'block';

    // 移除牌面的點擊事件並設定預設樣式
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((card) => {
        card.onclick = null;
        card.style.cursor = 'default';
    });

    front.classList.add("flip");

    // 畫面滑動至#prize
    $("html,body").animate({ scrollTop: $("#prize").offset().top }, 700);
}
