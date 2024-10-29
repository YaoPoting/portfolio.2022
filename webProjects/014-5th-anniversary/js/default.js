/* anchor slider */
$( () => {
	$('a[href*="#"]:not([href="#"])').click( function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// showbox
$('body').on('click','*[data-showbox]',function() {
    var boxName = $(this).data('showbox')
    if (boxName == 'close') {
        $('.box-cont').removeClass('active')
        $('.show-box').removeClass('active')
        if ( $('.rotate-award').hasClass('spin') == false) {
            $('.rotate-award').addClass('spin')
        }
    } else {
        showBoxFc(boxName)
    }
})


/* 驗證身份 */
function show_award() {
    var valID = $('input#memberID').val()
    var valName = $('input#memberName').val()
    var ValPhone = $('input#memberPhone').val()
    if( valID > 0 || valName > 0 || ValPhone > 0) {
        // 欄位有值, 關閉 .show-box, 開始抽獎
        $('.box-cont').removeClass('active')
        $('.show-box').removeClass('active')
        luckyGO()
    } else {
        // 欄位空值, 顯示 .error-box
        showBoxFc('error-box')
    }
    // 清空欄位
    $('input#memberID').val('')
    $('input#memberName').val('')
    $('input#memberPhone').val('')
}

function show_award() {
    var valID = $('input#memberID').val();
    var valName = $('input#memberName').val();
    var valPhone = $('input#memberPhone').val();

    if (/^[0-9]+$/.test(valID) && valID !== '' &&
        valName !== '' &&
        /^[0-9]{10}$/.test(valPhone) && valPhone !== '') {

        // 欄位有值且符合條件，關閉 .show-box，開始抽獎
        $('.box-cont').removeClass('active');
        $('.show-box').removeClass('active');
        luckyGO();
    } else {
        showBoxFc('error-box');
    }
    
    // 清空欄位
    $('input#memberID').val('');
    $('input#memberName').val('');
    $('input#memberPhone').val('');
}



// 切換 show-box
function showBoxFc(boxShow) {
    $('.show-box').removeClass('active')
    $('.box-cont').addClass('active')
    $('.' + boxShow).addClass('active')
}
    



// 隨機抽獎, 抽完後, 獎值代入 rotateFunc()
function luckyGO() {
    $('.rotate-cont').addClass('disabled'); /* 點擊抽獎時開啟遮蔽，預防二次點擊 */
    data = Math.floor(Math.random()*8);
    switch(data){
        case 1:
            rotateFunc(22.5,'<span>筋膜槍</span>')
            break
        case 2:
            rotateFunc(67.5,'<span>Airpods</span>')
            break
        case 3:
            rotateFunc(112.5,'<span>樂維根隨身包</span>')
            break
        case 4:
            rotateFunc(157.5,'<span>VERVE</span><span>購物金</span>')
            break
        case 5:
            rotateFunc(202.5,'<span>樂維根</span><span>高蛋白1KG</span>')
            break
        case 6:
            rotateFunc(247.5,'<span>采采按摩券</span>')
            break
        case 7: 
            rotateFunc(292.5,'<span>美天美點</span><span>飲控組合包</span>')
            break
        case 8:
            rotateFunc(337.5,'<span>樂維根隨身包</span>')
            break
        /* default:
            rotateFunc(22.5,'<span>光復店</span><span>自主訓練一次</span>')
            break */
    }
}

// 轉盤動畫, 結束後顯示獎品
var rotateFunc = function(angleNum,text){
    setTimeout( function() {
        location.href = "#locky_GO"
        $('.rotate-award').removeClass('spin');
        $(".rotate-go").addClass('active');
        $('.rotate-award').stopRotate();
        $('.rotate-award').rotate({
            angle: 0,
            duration: 5000,
            animateTo: angleNum + 3600,
            callback: function(){
                setTimeout( function(){
                    // 開啟 .gift-box
                    showBoxFc('gift-box')
                    $(".rotate-go").removeClass('active')
                    $('.gift-box .detail').html(text); /* 顯示中獎品名 */
                    $('.rotate-cont').removeClass('disabled'); /* 移除遮蔽 */
            }, 300 )
            }
        })
    }, 200 )
}