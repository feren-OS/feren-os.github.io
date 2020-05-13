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

// Make sure all tiles are set
var i; 
for (i=1; i < 9; i++) {
    if (getCookie('tile' + i + 'settings') == 'undefined') {
        setDefaultTileURLS()
    }
}

var tileDefaultURLS = [
    "",
    "https://ferenos.weebly.com",
    "https://vivaldi.net/",
    "https://ferenos.weebly.com/discord",
    "https://twitter.com/Feren_OS",
    "https://omgubuntu.co.uk/",
    "https://facebook.com/",
    "https://twitter.com/",
    "https://chrome.google.com/webstore"
]

function resetTileSettings() {
    var tile = document.getElementById('tileNum').innerHTML;
    setCookie("tile" + tile + "settings", tileDefaultURLS[tile]);
    document.getElementById('tilewebsitetextbox').value=getCookie("tile" + tile + "settings")
}

function setDefaultTileURLS() {
    setCookie("tile1settings",  tileDefaultURLS[1])
    setCookie("tile2settings",  tileDefaultURLS[2])
    setCookie("tile3settings",  tileDefaultURLS[3])
    setCookie("tile4settings",  tileDefaultURLS[4])
    setCookie("tile5settings",  tileDefaultURLS[5])
    setCookie("tile6settings",  tileDefaultURLS[6])
    setCookie("tile7settings",  tileDefaultURLS[7])
    setCookie("tile8settings",  tileDefaultURLS[8])
}

function openTileSettings(tile) {
    document.getElementById('tileNum').innerHTML = tile;
    document.getElementById('tilewebsitetextbox').value=getCookie("tile" + tile + "settings");
    document.getElementById('tilewebsitetextbox').placeholder=tileDefaultURLS[tile];
    
    if ( document.getElementById('tilewebsitetextbox').value == 'undefined' || document.getElementById('tilewebsitetextbox').value == '') {
        setDefaultTileURLS();
        document.getElementById('tilewebsitetextbox').value=getCookie("tile" + tile + "settings");
    }
    document.getElementById('tileSettings').style.display = 'inline-block';
    document.getElementById('overlay').style.display = 'block';
}

function saveTileSettings() {
    document.getElementById("tileSettings").style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    var tile = document.getElementById('tileNum').innerHTML;
    setCookie("tile" + tile + "settings", document.getElementById("tilewebsitetextbox").value);
    initTiles();
}
