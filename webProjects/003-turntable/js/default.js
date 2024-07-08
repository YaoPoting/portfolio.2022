AOS.init({
    easing: 'ease-in-out-sine',
});

/* 抽獎 */
function addRotatingAnim() {
    $('.prizeWheel').addClass('rotatingAnim'); //加入自轉
}
function jackpot() {
    $('.prizeWheelCont').addClass('disable'); // 點擊抽獎時開啟遮蔽，禁止二次點擊

    data = Math.floor(Math.random()*8);
    switch(data){
        case 0: 
            rotateFunc(22.5,'<span>國中物理</span><span>攻略</span>');
            break;
        case 1: 
            rotateFunc(67.5,'<span>數學公式</span><span>寶典</span>');
            break;
        case 2: 
            rotateFunc(112.5,'<span>兒童程式課</span><span>一堂</span>');
            break;
        case 3: 
            rotateFunc(157.5,'<span>國中文理課</span><span>一堂</span>');
            break;
        case 4: 
            rotateFunc(202.5,'<span>兒童日語課</span><span>一堂</span>');
            break;
        case 5: 
            rotateFunc(247.5,'<span>兒童美語課</span><span>一堂</span>');
            break;
        case 6: 
            rotateFunc(292.5,'<span>LINE POINTS </span><span>100點</span>');
            break;
        case 7: 
            rotateFunc(337.5,'<span>LINE POINTS </span><span>50點</span>');
    }
}

var rotateFunc = function(angleNum,text){
    setTimeout( function(){
        $('.prizeWheel').removeClass('rotatingAnim'); //移除自轉
        $('.prizeWheel').stopRotate();
        $('.prizeWheel').rotate({
            angle: 0,
            duration: 12000,
            animateTo: angleNum + 2160,
            callback: function(){
                setTimeout( function(){
                    $("#modalPrizeBt").click(); //模擬點擊獎品按紐
                    $('#modalPrize .detail').html(text); //獎品名稱顯示至detail
                    $('.prizeWheelCont').removeClass('disable'); // 移除遮蔽
            }, 0 );
            }
        });
    }, 200 );
};