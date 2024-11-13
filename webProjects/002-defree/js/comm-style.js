$(document).ready(function(){
    $(".go_fillform").click(function(){
        $('html, body').stop().animate({scrollTop: $('.fillform').offset().top - 50 }, 350);
    });
    
    
});
