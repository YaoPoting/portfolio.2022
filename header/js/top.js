$(document).ready(function(){
    switch_promotion();
    /*frame_height();*/
});


function switch_promotion() {
    $('.switch').click(function(){
        $('.mobile_header_promotion').toggleClass('on');
    });
}
/*
function frame_height() {
    var style = parent.document.createElement('style');
    style.innerText = `.top { position: absolute; top: 0; left: 0; width: 100%; height: 311px; margin-bottom: -256px; z-index: 9999999999999; } .top iframe { height: 311px; } .top + * { margin-top: 65px; }  .footer { width: 100%; height: 290px; z-index: 9999999999999; } .footer iframe { height: 290px; }  @media screen and (max-width: 1023px) { .top { height: 460px; margin-bottom: 405px; } .top iframe { height: 460px; } .footer, .footer iframe { height: 594px; } }`;
    parent.document.getElementsByTagName('head')[0].appendChild(style);
}*/