window.onload=init;

var setting={
    count:0,
    total:24,
    delay:20,
    picIndex:[0,1,2,4,7,6,5,3]
}

function init(){
    document.getElementById("drawBtn").onclick=function(){
        document.getElementById("bt-forSales").click();
        setting.count=0;
        setting.delay=20;
        this.disabled=true;//禁用按鈕
        var drawBtn=this;
        //獲取所有圖片的div
        var allDivs=document.getElementsByClassName("pic");
        //獲得一個隨機整數，代表中獎的那個位置，3*8+(0-7)
        setting.total+=Math.floor(Math.random()*allDivs.length);
        //設置定時器，依次修改每個div背景的顏色.
        setTimeout(function show(){
            //重置上一個背景的顏色
        for (var i=0;i<allDivs.length;i++){
            allDivs[i].style.backgroundColor="#ffd500";
        }
            //找到要修改的那個背景的顏色設置
                var currentPic=allDivs[setting.picIndex[setting.count%8]];
                currentPic.style.backgroundColor="white";
            setting.count++;
            setting.delay+=2*setting.count;
                if(setting.count>setting.total){
                    document.getElementById("bt-prize").click();
                    drawBtn.disabled=false;
                    return;
                }
                setTimeout(show,setting.delay);
        },setting.delay);
    }
}