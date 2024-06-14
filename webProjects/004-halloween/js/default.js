AOS.init({
    easing: 'ease-in-out-sine',
});
//<![CDATA[
fromto='99132002';//]]>

/* 抽獎 */
function ClickdrawBt() {
    $("#modalFormBt").click(); //模擬點擊填單按紐
}
function addRotatingAnim() {
    $('.prizeWheel').addClass('rotatingAnim'); //加入自轉
}
function jackpot() {
    $('.prizeWheelCont').addClass('disable'); // 點擊抽獎時開啟遮蔽，禁止二次點擊

    let data = Math.floor(Math.random()*10);
    switch(data){
        case 0: 
            rotateFunc(18,'國中文理體驗課<div class="prizeComment">系統已幫您保留獎項，線上客服會聯您，協助兌換獎項。</div>','國中文理體驗課');
            break;
        case 1: 
            rotateFunc(54,'兒童程式體驗課<div class="prizeComment">系統已幫您保留獎項，線上客服會聯您，協助兌換獎項。</div>','兒童程式體驗課');
            break;
        case 2: 
            rotateFunc(90,'兒童外語體驗課<div class="prizeComment">系統已幫您保留獎項，線上客服會聯您，協助兌換獎項。</div>','兒童外語體驗課');
            break;
        case 3: 
            rotateFunc(126,'美日語白金卡<div class="prizeComment">系統已幫您保留獎項，線上客服會聯您，協助兌換獎項。</div>','美日語白金卡');
            break;
        case 4: 
            rotateFunc(162,'統一超商100元券<div class="prizeComment"><div>請確實填寫中獎人資訊</div><div class="formFlex py-3"><input class="inputWidth" type="text" placeholder="姓名" /><input class="inputWidth" type="text" placeholder="電話" /><input class="inputWidth" type="text" placeholder="身分證字號" /><input class="inputWidth" type="text" placeholder="地址" /></div><div>獎項將於填寫中獎人資訊確認送出後，透過簡訊發送給您。</div></div>','統一超商100元券');
            break;
        case 5: 
            rotateFunc(198,'麥當勞蛋捲冰淇淋<div class="prizeComment"><div>請確實填寫中獎人資訊</div><div class="formFlex py-3"><input class="inputWidth" type="text" placeholder="姓名" /><input class="inputWidth" type="text" placeholder="電話" /><input class="inputWidth" type="text" placeholder="身分證字號" /><input class="inputWidth" type="text" placeholder="地址" /></div><div>獎項將於填寫中獎人資訊確認送出後，透過簡訊發送給您。</div></div>','麥當勞蛋捲冰淇淋');
            break;
        case 6: 
            rotateFunc(234,'LINE POINTS 100點<div class="prizeComment"><div>請確實填寫中獎人資訊</div><div class="formFlex py-3"><input class="inputWidth" type="text" placeholder="姓名" /><input class="inputWidth" type="text" placeholder="電話" /><input class="inputWidth" type="text" placeholder="身分證字號" /><input class="inputWidth" type="text" placeholder="地址" /></div><div>獎項將於填寫中獎人資訊確認送出後，透過簡訊發送給您。</div></div>','LINE POINTS 100點');
            break;
        case 7: 
            rotateFunc(270,'LINE POINTS 30點<div class="prizeComment"><div>請確實填寫中獎人資訊</div><div class="formFlex py-3"><input class="inputWidth" type="text" placeholder="姓名" /><input class="inputWidth" type="text" placeholder="電話" /><input class="inputWidth" type="text" placeholder="身分證字號" /><input class="inputWidth" type="text" placeholder="地址" /></div><div>獎項將於填寫中獎人資訊確認送出後，透過簡訊發送給您。</div></div>','LINE POINTS 30點');
            break;
        case 8: 
            rotateFunc(306,'筆電<div class="prizeComment">系統已幫您保留獎項，線上客服會聯您，協助兌換獎項。</div>','筆電');
            break;
        case 9: 
            rotateFunc(342,'造型南瓜桶<div class="prizeComment">(10/28活動當日限定)</div>','造型南瓜桶');
    }
}
var rotateFunc = function(angleNum,prize4html,prize4server){
    setTimeout( function(){
        $('.prizeWheel').removeClass('rotatingAnim'); //移除自轉
        $('.prizeWheel').stopRotate();
        $('.prizeWheel').rotate({
            angle: 0,
            duration: 12000,
            animateTo: angleNum + 2160,
            callback: function(){
                setTimeout( function(){
                    $("#modalPrizeBt").click(); //模擬點擊獎品按鈕
                    $('#modalPrize .detail').html(prize4html); //獎品名稱顯示至detail
                    $('.prizeWheelCont').removeClass('disable'); // 移除遮蔽
                });
            },
        });
    }, 200 );
    prize += "，" + prize4server;
}