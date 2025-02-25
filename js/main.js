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
function scrollToGraphics() {
    const anchor = document.querySelector('.graphicsAnchor');
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

let grid = document.querySelector('.grid');

let msnry = new Masonry( grid, {
  itemSelector: 'none', // select none at first
  columnWidth: '.grid__col-sizer',
  gutter: '.grid__gutter-sizer',
  percentPosition: true,
  stagger: 30,
  // nicer reveal transition
  visibleStyle: { transform: 'translateY(0)', opacity: 1 },
  hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});

// initial items reveal
imagesLoaded( grid, function() {
  grid.classList.remove('are-images-unloaded');
  msnry.options.itemSelector = '.grid__item';
  let items = grid.querySelectorAll('.grid__item');
  msnry.appended( items );
});

// init Infinte Scroll
let infScroll = new InfiniteScroll( grid, {
  path: getPenPath,
  append: '.grid__item',
  outlayer: msnry,
  status: '.page-load-status',
  history: false
});

//-------------------------------------//
