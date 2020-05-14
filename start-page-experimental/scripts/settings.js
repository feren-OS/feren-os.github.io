function setCookie(name, value)
{
    var expires = "";
    expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = name + "=" + (value || "") + expires;
}

function getCookie(cname)
{
    var match = document.cookie.match(new RegExp('(^| )' + cname + '=([^;]+)'));
    if (match) return match[2];
}

var getbgurl = getbgurl || {}

function getbg() {
    var bgurltext = (getCookie("userbg") || "../start-page/resources/bg.jpg");
    document.getElementById("bgurltextbox").value=bgurltext;
}

function gettickboxesstates() {
    var hidetiles = getCookie("hidetiles");
    document.getElementById("hidetilestoggle").checked=hidetiles;
    var hideblog = getCookie('hideblog');
    document.getElementById("hideblogtoggle").checked=hideblog;
    var hidecredits = getCookie('hidecredits');
    document.getElementById("hidecreditstoggle").checked=hidecredits;
}

function savesettings() {
//     if (document.getElementById("bgurltextbox").value = null) {
//         document.getElementById("bgurltextbox").value="/resources/bg.jpg";
//     }
    setCookie("userbg", document.getElementById("bgurltextbox").value)
    setCookie("hidetiles", document.getElementById("hidetilestoggle").checked)
    setCookie("hideblog", document.getElementById("hideblogtoggle").checked)
    setCookie("hidecredits", document.getElementById("hidecreditstoggle").checked)
    window.location.href = "https://feren-os.github.io/start-page";
}


