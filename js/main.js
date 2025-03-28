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
}

function scrollToGraphics() {
    const anchor = document.querySelector('.graphicsAnchor');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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

// kv smoke
window.addEventListener('load', function() {
    document.body.style.backgroundColor = "#FFB000";
});

const smokeContainer = document.getElementById('smokeContainer');
for (let i = 0; i < 60; i++) {
    const smokeElement = document.createElement('div');
    smokeElement.classList.add('smoke');
    smokeContainer.appendChild(smokeElement);
}

//-------------------------------------//

let grid = document.querySelector('.image-grid');
if (!grid) {
    console.error('無法找到 .image-grid 元素，請檢查 HTML 結構');
}

// 初始化 Masonry
let msnry = new Masonry(grid, {
    itemSelector: '.image-grid__item',
    columnWidth: '.image-grid__col-sizer',
    gutter: '.image-grid__gutter-sizer',
    percentPosition: true
});

// 初始載入時移除 are-images-unloaded
imagesLoaded(grid, function() {
    grid.classList.remove('are-images-unloaded');
    msnry.layout();
    console.log('初始圖片載入完成，移除 are-images-unloaded');
});

// 初始化 Infinite Scroll
let infScroll = new InfiniteScroll(grid, {
    path: function() {
        return `./page${this.pageIndex + 1}.html`;
    },
    append: '.image-grid__item',
    outlayer: msnry,
    history: false,
    status: '.scroller-status',
    scrollThreshold: 400,
    onInit: function() {
        console.log('Infinite Scroll 初始化成功');
    },
    onAppend: function(response, path, items) {
        console.log(`已載入 ${path}，附加 ${items.length} 個項目`);
        imagesLoaded(grid, function() {
            grid.classList.remove('are-images-unloaded'); // 確保每次載入後移除
            msnry.appended(items);
            msnry.layout();
            console.log('Masonry 佈局完成');
        });
    },
    onError: function(error) {
        console.error('InfiniteScroll 載入錯誤:', error);
    }
});

// 阻止 pagination__next 的默認行為
const nextLink = document.querySelector('.pagination__next');
if (nextLink) {
    nextLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('已阻止 pagination__next 的跳轉');
    });
}