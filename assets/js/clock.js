// assets/js/clock.js

function refrClock() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    var day = d.getDay();
    var date = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var days = new Array("الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت");
    var months = new Array("يناير", "فبراير", "مارس", "ابريل", "مايو", "يونيو", "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر");
    var am_pm;

    if (s < 10) { s = "0" + s; }
    if (m < 10) { m = "0" + m; }
    if (h > 12) { h -= 12; am_pm = "مساءً."; } else { am_pm = "صباحاً."; }
    if (h < 10) { h = "0" + h; }

    document.getElementById("clock").innerHTML = days[day] + " " + date + " من " + months[month] + " " + year + " | الساعة الان " + h + ":" + m + ":" + s + " " + am_pm;
}

// تشغيل الدالة كل ثانية
setInterval(refrClock, 1000);

// التأكد من أن الساعة تظهر مباشرة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", refrClock);