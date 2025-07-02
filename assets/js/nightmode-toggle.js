//<![CDATA[
// Night Mode
$("#nightmode").click(function(){
    $("body").toggleClass("nightmode")
}),
$("body").toggleClass(localStorage.toggled),
$("#nightmode").click(function(){
    "nightmode" != localStorage.toggled ? ($("body").toggleClass("nightmode",!0), localStorage.toggled="nightmode") : ($("body").toggleClass("nightmode",!1), localStorage.toggled="")
});
//]]>