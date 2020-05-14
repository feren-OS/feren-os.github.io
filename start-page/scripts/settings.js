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
var DefaultTileNames = [
    "",
    "Feren OS Website",
    "Vivaldi Community",
    "Feren Community Discord",
    "Feren OS on Twitter",
    "OMG! Ubuntu",
    "Facebook",
    "Twitter",
    "Get More Extensions"
]
var DefaultTileImages = [
    "",
    "resources/sd_feren-os.png",
    "resources/sd_vivaldi_community.gif",
    "resources/sd_discord_feren.png",
    "resources/sd_twitter_feren.png",
    "resources/sd_omgubuntu.png",
    "resources/sd_facebook.png",
    "resources/sd_twitter.png",
    "resources/sd_chrome_extensions.png",
    "resources/sd_feren.png",
    "resources/sd_vivaldi.png",
    "resources/sd_generic.png",
    "resources/sd_unsplash.png",
    "resources/sd_wikipedia.png",
    "resources/sd_discord.png"
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
        // Check if we're not in the Settings page before trying to set tile links
        if (Boolean(location.href.search('settings') == -1) == true) {
            document.getElementById('tile' + i + 'url').href = (getCookie('tile' + i + 'currenturl') || DefaultTileURLs[i]);
        }
    }
}

function openTileSettings(tile) {
    //currenttilenumber is used in the settings popout dialog
    document.getElementById('currenttilenumber').innerHTML = tile;
    
    document.getElementById('currenttilenametextbox').value = (getCookie('tile' + tile + 'currentname') || DefaultTileNames[tile]);
    document.getElementById('currenttilenametextbox').placeholder = DefaultTileNames[tile];
    
    document.getElementById('currenttileurltextbox').value = (getCookie('tile' + tile + 'currenturl') || DefaultTileURLs[tile]);
    document.getElementById('currenttileurltextbox').placeholder = DefaultTileURLs[tile];
    
    document.getElementById('currenttileimagetextbox').value = (getCookie('tile' + tile + 'currentimage') || DefaultTileImages[tile]);
    document.getElementById('currenttileimagetextbox').placeholder = DefaultTileImages[tile];
    
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
    
    // Make sure the URL starts with https:// or http:// before we save it to the tile
    if ((document.getElementById("currenttileurltextbox").value.startsWith("https://") == false) && (document.getElementById("currenttileurltextbox").value.startsWith("http://") == false)) {
        document.getElementById("currenttileurltextbox").value = ("https://" + document.getElementById("currenttileurltextbox").value)
    }
    
    // Make sure the image URL is also valid before we save it to the tile
    if ((document.getElementById("currenttileimagetextbox").value.startsWith("https://") == false) && (document.getElementById("currenttileimagetextbox").value.startsWith("http://") == false) && (document.getElementById("currenttileimagetextbox").value.startsWith("data:") == false) && (document.getElementById("currenttileimagetextbox").value.startsWith("resources/") == false)) {
        document.getElementById("currenttileimagetextbox").value = ("https://" + document.getElementById("currenttileimagetextbox").value)
    }
    
    setCookie(("tile" + tile + "currentname"), document.getElementById("currenttilenametextbox").value);
    setCookie(("tile" + tile + "currenturl"), document.getElementById("currenttileurltextbox").value);
    setCookie(("tile" + tile + "currentimage"), document.getElementById("currenttileimagetextbox").value);
    closeTileSettings();
}

function clearTileSettings() {
    var tile = document.getElementById('currenttilenumber').innerHTML;
    setCookie(("tile" + tile + "currentname"), "");
    setCookie(("tile" + tile + "currenturl"), "");
    setCookie(("tile" + tile + "currentimage"), "");
    closeTileSettings();
}

function savesettings() {
//     if (document.getElementById("bgurltextbox").value = null) {
//         document.getElementById("bgurltextbox").value="/resources/bg.jpg";
//     }
    setCookie("userbg", document.getElementById("bgurltextbox").value);
    setCookie("hidetiles", document.getElementById("hidetilestoggle").checked);
    setCookie("hideblog", document.getElementById("hideblogtoggle").checked);
    setCookie("hidecredits", document.getElementById("hidecreditstoggle").checked);
    window.location.href = "https://feren-os.github.io/start-page";
}

function selectTileImageText() {
    document.getElementById("currenttileimagetextbox").value = generateImage(document.getElementById("currenttilenametextbox").value);
}

function selectTileImage(tileimage) {
    document.getElementById("currenttileimagetextbox").value = DefaultTileImages[tileimage];
}

function tileColour() {
    var letters = '0123'.split('');
    var color = '#';       
    color += letters[Math.round(Math.random() * 5)];
    letters = '01234567'.split('');
    for (var i = 0; i < 5; i++) {
        color += letters[Math.round(Math.random() * 6)];
    }
    return color;
}

// Custom Tile Image Handler
function generateImage(text) {
    var tCtx = document.getElementById("texttilecanvas").getContext("2d");
    tCtx.canvas.width = 240;
    tCtx.canvas.height = 196;
    tCtx.fillStyle = tileColour();
    tCtx.fillRect(0, 0, tCtx.canvas.width, tCtx.canvas.height);
    tCtx.fillStyle = "white";
    tCtx.textAlign = "center";
    tCtx.font = "22px Lato Light"
    tCtx.fillText(text, (tCtx.canvas.width / 2), (tCtx.canvas.height / 2) + 8);
    return tCtx.canvas.toDataURL();
}
