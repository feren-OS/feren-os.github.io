var getbgurl = getbgurl || {}
// Tiles configurations
var DefaultTileURLs = [
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
var DefaultTileImages = [
    "",
    "resources/sd_feren-os.png",
    "resources/sd_vivaldi_community.gif",
    "resources/sd_discord.png",
    "resources/sd_feren_twitter.png",
    "resources/sd_omgubuntu.png",
    "resources/sd_facebook.png",
    "resources/sd_twitter.png",
    "resources/sd_chrome_extensions.png"
]

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


function getbg() {
    var bgurltext = (getCookie("userbg") || "../start-page/resources/bg.jpg");
    document.getElementById("bgurltextbox").value = bgurltext;
}

function hidetickboxspecifics() {
    // Only if we're in Settings
    if (Boolean(location.href.search('settings') == -1) == false) {
        if (document.getElementById("hidetilestoggle").checked == true) {
            document.getElementById("tilestoggleon").style.display = "none";
        } else {
            document.getElementById("tilestoggleon").style.display = "block";
        }
    }
}

function gettickboxesstates() {
    var hidetiles = getCookie("hidetiles");
    document.getElementById("hidetilestoggle").checked = hidetiles;
    var hideblog = getCookie('hideblog');
    document.getElementById("hideblogtoggle").checked = hideblog;
    var hidecredits = getCookie('hidecredits');
    document.getElementById("hidecreditstoggle").checked = hidecredits;
    hidetickboxspecifics();
}

function loadTiles() {
    var i;
    for (i=1; i < 9; i++) {
        document.getElementById('tile' + i + 'image').src = (getCookie('tile' + i + 'currentimage') || DefaultTileImages[i]);
        // Check if we're in the Settings page before trying to set tile links
        if (Boolean(location.href.search('settings') == -1) == true) {
            document.getElementById('tile' + i + 'url').href = (getCookie('tile' + i + 'currenturl') || DefaultTileURLs[i]);
        }
    }
}

function openTileSettings(tile) {
    //currenttilenumber is used in the settings popout dialog
    document.getElementById('currenttilenumber').innerHTML = tile;
    
    document.getElementById('currenttileurltextbox').value = (getCookie('tile' + tile + 'currenturl') || DefaultTileURLs[tile]);
    document.getElementById('currenttileurltextbox').placeholder = (getCookie('tile' + tile + 'currenturl') || DefaultTileURLs[tile]);
    
    document.getElementById('currenttileimagetextbox').value = (getCookie('tile' + tile + 'currentimage') || DefaultTileImages[tile]);
    document.getElementById('currenttileimagetextbox').placeholder = (getCookie('tile' + tile + 'currentimage') || DefaultTileImages[tile]);
    
    document.getElementById('tilesettingspopup').style.display = 'inline-block';
    document.getElementById('overlay').style.display = 'block';
}

function closeTileSettings() {
    document.getElementById("tilesettingspopup").style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    loadTiles();
}

function saveTileSettings() {
    var tile = document.getElementById('currenttilenumber').innerHTML;
    setCookie("tile" + tile + "currenturl", document.getElementById("currenttileurltextbox").value);
    setCookie("tile" + tile + "currentimage", document.getElementById("currenttileimagetextbox").value);
    closeTileSettings();
}

function clearTileSettings() {
    var tile = document.getElementById('currenttilenumber').innerHTML;
    setCookie("tile" + tile + "currenturl", "");
    setCookie("tile" + tile + "currentimage", "");
    closeTileSettings();
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
