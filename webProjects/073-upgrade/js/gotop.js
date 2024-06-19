$(window).scroll(function(){
  if ($(this).scrollTop() > 250) { // If the scroll equal 150px
    $(".gotop").css({width:"120",borderRadius:"0"}); // Show the button by give it (width 40px and border-radius 0px)
  } else { // else (if the scroll <= 150px )
    $(".gotop").css({width:"0",borderRadius:"50% 0 0 50%"}); // Return button style to default
  }
});
$('.gotop').click(function () { // When user click on the button
  //$("body").animate({ scrollTop: "0" },  720); // Return scroll to 0
  $("body").css({paddingTop:"0"});
  // After .5s (when window scroll equal 0)
  setTimeout(function(){
    $("body").animate({ 
      'padding-top' : 0,
    }, "fast");
  }, 300);
});