/* anchor slider */
$(function() {
  $('li-link').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
      $('html, body').animate({
          scrollTop: target.offset().top - 60 /* 增減停留位置 */
      }, 1000);
      return false;
          }
      }
      });
  });


AOS.init();

/* scrollSpy 判斷頁面位置，並顯示作用在選單上  */
function scrollSpy() {
    var itemNum = $('.table-list .item').length;
	var itemArr = [];
    for (z = 1; z < itemNum + 1; z++ ){
        var x = String(z);
        x = x.padStart(2, '0');
        itemArr.push('class_' + x);        
    }
	var current;
	for (var i = 0; i < itemArr.length; i++) {
		if ( $('#'+itemArr[i]).offset().top <= $(window).scrollTop() + 80 ) {
			current = itemArr[i];
		}
	}
	$(".menu a[href='#"+current+"']").addClass('active');
	$(".menu a").not("a[href='#"+current+"']").removeClass('active');
}

$(document).ready( function() {
     scrollSpy();
});

$(window).scroll( function() {
    scrollSpy();
});