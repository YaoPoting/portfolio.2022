AOS.init({
    easing: 'ease-in-out-sine',
});

function scrollToForm() {
    const anchor = document.querySelector('.formAnchor');
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

var dept = "B11";
var seq_no = "0";
var web_pno = "113035900001"; 
var NList_Type = "9";
var fromto = "";
var Gift = "";
var is_Mobile = "0";

$(function () {
    if (isMobile()) {
        web_pno = "113035900002";  
        is_Mobile = "1";
    }
});

function isMobile() {
    try { document.createEvent("TouchEvent"); return true; }
    catch (e) { return false; }
}

function but_send() {
    $('#sBut').hide();
    GetPno();

    var JSonData = {
        "name": $("#name").val(),
        "mobile": $("#mobile").val(),
        "email": $("#email").val(),
        "memberNumber": $("#memberNumber").val(),
        "seq_no": seq_no,
        "dept_no": dept,
        "memo": "免費體驗+諮詢" + Gift,
        "web_pno": web_pno,
        "fromto": QueryString("fromto") != null ? QueryString("fromto") : fromto,
        "fromurl": document.location.href,
        "sourceid": QueryString("fc") != null ? QueryString("fc") : "",
        "NList_Type": NList_Type,
        "IsSend": "N",
        "func": "njycooooqj"
    }
    if ($("input[name=per_chk]:checked").length == 0) {
        alert('請勾選同意個資保護聲明。');
        $('#sBut').show();
        return false;
    }
    if (JSonData.name == "" || JSonData.name == "請輸入姓名") {
        alert('請填寫入姓名。');
        $('#sBut').show();
        return false;
    }
    if (JSonData.mobile == "" || JSonData.mobile == "請輸入行動電話") {
        alert('請填寫行動電話。');
        $('#sBut').show();
        return false;
    }
    if (isNaN(JSonData.mobile) == true) {
        alert('行動電話格式錯誤。');
        $('#sBut').show();
        return false;
    }
    if (JSonData.mobile.length != 10) {
        alert('行動電話格式錯誤。');
        $('#sBut').show();
        return false;
    }
    if (JSonData.email == "" || JSonData.email == "E-Mail") { JSonData.email = "" } else {
        if (JSonData.email.indexOf("@") <= -1) {
            alert('電子郵件格式錯誤。');
            $('#sBut').show();
            return false;
        }
    }
    if (Gift == "") {
        alert('請選擇諮詢分校。');
        $('#sBut').show();
        return false;
    }

    goSubmit(JSonData, s, f);

}

function s(data) {
    if (data[0].result == "1") {
        $("#name").val("");
        $("#mobile").val("");
        $("#sBut").show(); alert('送出成功');
        document.location.href = "/wGuest/loadover.htm";
    } else {
        alert('送出失敗！');
        $("#sBut").show();
    }
}

function f(data) {
    alert(data);
    $("#sBut").show();
}

//下拉選單(左SP右邊PC)  -----start
function GetPno() {
    var select_val = $("#dpGift :selected").val();
    switch (select_val) {
        case "B11":
            dept = "B11";
            web_pno = is_Mobile == "1" ? "113075900002" : "113075900001";
            Gift = "登記「民權分校」";
            break;
        case "B13":
            dept = "B13";
            web_pno = is_Mobile == "1" ? "113075900002" : "113075900001";
            Gift = "登記「光復分校」";
            break;
    }
}
//下拉選單  -----end