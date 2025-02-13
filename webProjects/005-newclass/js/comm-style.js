$(document).ready(function(){
    $(".go_fillform").click(function(){
        $('html, body').stop().animate({scrollTop: $('.fillform').offset().top - 50 }, 0);
    });
});

$(document).ready(function(){
    for(let i = 1; i <= 6; i++) {
        let padNum = i.toString().padStart(2, '0');
        $(`.class_${padNum}`).click(function(){
            $('html, body').stop().animate({
                scrollTop: $(`.item-${padNum}`).offset().top
            }, 0);
        });
    }
});