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
    "resources/sd_vivaldi_community.png",
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
    policy = "; SameSite=Strict";
    document.cookie = name + "=" + (value || "") + expires + policy;
}

function getCookie(cname)
{
    var match = document.cookie.match(new RegExp('(^| )' + cname + '=([^;]+)'));
    if (match) return match[2];
}

function migrateSettings() {
    if (getCookie("lastconfigmirgration") == "202103") {
        return;
    }
    
    if (getCookie("userbg") == "../start-page/resources/bg.jpg") {
        setCookie("userbg", "https://source.unsplash.com/collection/19065423");
    }
    if (getCookie("tile1currentimage") == "resources/sd_vivaldi_community.gif" ) {
        setCookie("tile1currentimage", "resources/sd_vivaldi_community.png");
    }
    if (getCookie("tile2currentimage") == "resources/sd_vivaldi_community.gif" ) {
        setCookie("tile2currentimage", "resources/sd_vivaldi_community.png");
    }
    if (getCookie("tile3currentimage") == "resources/sd_vivaldi_community.gif" ) {
        setCookie("tile3currentimage", "resources/sd_vivaldi_community.png");
    }
    if (getCookie("tile4currentimage") == "resources/sd_vivaldi_community.gif" ) {
        setCookie("tile4currentimage", "resources/sd_vivaldi_community.png");
    }
    if (getCookie("tile5currentimage") == "resources/sd_vivaldi_community.gif" ) {
        setCookie("tile5currentimage", "resources/sd_vivaldi_community.png");
    }
    if (getCookie("tile6currentimage") == "resources/sd_vivaldi_community.gif" ) {
        setCookie("tile6currentimage", "resources/sd_vivaldi_community.png");
    }
    if (getCookie("tile7currentimage") == "resources/sd_vivaldi_community.gif" ) {
        setCookie("tile7currentimage", "resources/sd_vivaldi_community.png");
    }
    if (getCookie("tile8currentimage") == "resources/sd_vivaldi_community.gif" ) {
        setCookie("tile8currentimage", "resources/sd_vivaldi_community.png");
    }
    
    setCookie("lastconfigmirgration", "202103");
}

function getbg() {
    var bgurltext = (getCookie("userbg") || "https://source.unsplash.com/collection/19065423");
    document.getElementById("bgurltextbox").value = bgurltext;
}

function gettickboxesstates() {
    var use12hrclock = (getCookie("12hrclock") || false);
    document.getElementById("toggle12hrclock").checked = use12hrclock;
}
function tileColour() {
    var letters = "0123".split("");
    var color = "#";       
    color += letters[Math.round(Math.random() * 5)];
    letters = "1234567".split("");
    for (var i = 0; i < 5; i++) {
        color += letters[Math.round(Math.random() * 5)];
    }
    return color.replace("undefined", "0");
}

// Custom Tile Image Handler
function generateImage(text) {
    var tCtx = document.getElementById("texttilecanvas").getContext("2d");
    tCtx.canvas.width = 220;
    tCtx.canvas.height = 38;
    tCtx.fillStyle = tileColour();
    tCtx.fillRect(0, 0, tCtx.canvas.width, tCtx.canvas.height);
    tCtx.fillStyle = "white";
    tCtx.textAlign = "center";
    tCtx.font = "16px Inter"
    tCtx.fillText(text, (tCtx.canvas.width / 2), (tCtx.canvas.height / 2) + 8);
    return tCtx.canvas.toDataURL();
}

function loadTiles() {
    var i;
    for (i=1; i < 9; i++) {
        if (getCookie("tile" + i + "usestext") == "true") {
            document.getElementById("tile" + i + "image").src = generateImage(getCookie("tile" + i + "currentimage").substr(5));
        } else {
            document.getElementById("tile" + i + "image").src = (getCookie("tile" + i + "currentimage") || DefaultTileImages[i]);
        }
        
        // Check if we"re not in the Settings page before trying to set tile links
        if (Boolean(location.href.search("settings") == -1) == true) {
            document.getElementById("tile" + i + "url").href = (getCookie("tile" + i + "currenturl") || DefaultTileURLs[i]);
        }
    }
}

function openTileSettings(tile) {
    //currenttilenumber is used in the settings popout dialog
    document.getElementById("currenttilenumber").innerHTML = tile;
    
    document.getElementById("currenttilenametextbox").value = (getCookie("tile" + tile + "currentname") || DefaultTileNames[tile]);
    document.getElementById("currenttilenametextbox").placeholder = DefaultTileNames[tile];
    
    document.getElementById("currenttileurltextbox").value = (getCookie("tile" + tile + "currenturl") || DefaultTileURLs[tile]);
    document.getElementById("currenttileurltextbox").placeholder = DefaultTileURLs[tile];
    
    document.getElementById("currenttileimagetextbox").value = (getCookie("tile" + tile + "currentimage") || DefaultTileImages[tile]);
    document.getElementById("currenttileimagetextbox").placeholder = DefaultTileImages[tile];
    
    document.getElementById("tilesettingspopup").style.display = "inline-block";
    document.getElementById("overlay").style.display = "block";
}

function closeTileSettings() {
    document.getElementById("tilesettingspopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    loadTiles();
}

function saveTileSettings() {
    var tile = document.getElementById("currenttilenumber").innerHTML;
    
    // Make sure the URL starts with https:// or http:// before we save it to the tile
    if ((document.getElementById("currenttileurltextbox").value.startsWith("https://") == false) && (document.getElementById("currenttileurltextbox").value.startsWith("http://") == false)) {
        document.getElementById("currenttileurltextbox").value = ("https://" + document.getElementById("currenttileurltextbox").value)
    }
    
    // Make sure the image URL is also valid before we save it to the tile
    if ((document.getElementById("currenttileimagetextbox").value.startsWith("https://") == false) && (document.getElementById("currenttileimagetextbox").value.startsWith("http://") == false) && (document.getElementById("currenttileimagetextbox").value.startsWith("text:") == false) && (document.getElementById("currenttileimagetextbox").value.startsWith("resources/") == false)) {
        document.getElementById("currenttileimagetextbox").value = ("https://" + document.getElementById("currenttileimagetextbox").value)
    }
    
    setCookie(("tile" + tile + "currentname"), document.getElementById("currenttilenametextbox").value);
    setCookie(("tile" + tile + "currenturl"), document.getElementById("currenttileurltextbox").value);
    setCookie(("tile" + tile + "currentimage"), document.getElementById("currenttileimagetextbox").value);
    if (document.getElementById("currenttileimagetextbox").value.startsWith("text:") == true) {
        setCookie(("tile" + tile + "usestext"), "true");
    } else {
        setCookie(("tile" + tile + "usestext"), "");
    }
    closeTileSettings();
}

function clearTileSettings() {
    var tile = document.getElementById("currenttilenumber").innerHTML;
    setCookie(("tile" + tile + "currentname"), "");
    setCookie(("tile" + tile + "currenturl"), "");
    setCookie(("tile" + tile + "currentimage"), "");
    setCookie(("tile" + tile + "usestext"), "");
    closeTileSettings();
}

function savesettings() {
//     if (document.getElementById("bgurltextbox").value = null) {
//         document.getElementById("bgurltextbox").value="/resources/bg.jpg";
//     }
    setCookie("userbg", document.getElementById("bgurltextbox").value);
    setCookie("use12hrclock", document.getElementById("toggle12hrclock").checked);
    window.location.href = "https://feren-os.github.io/start-page";
}

function selectTileImageText() {
    document.getElementById("currenttileimagetextbox").value = ("text:" + document.getElementById("currenttilenametextbox").value);
}

function selectTileImage(tileimage) {
    document.getElementById("currenttileimagetextbox").value = DefaultTileImages[tileimage];
}


function toggleChangeEnginePopup(show) {
    
    if (show == true) {
        document.getElementById("searchenginepopup").style.display = "inline-block";
        document.getElementById("overlay").style.display = "block";
    } else {
        document.getElementById("searchenginepopup").style.display = "none";
        document.getElementById("overlay").style.display = "none";
    }

}
function selectEngine(enginename, changecookie) {
    if (changecookie == true) {
        setCookie("lastengine", enginename);
    }
    
    document.getElementById("searchenginestr").innerHTML = eng[enginename].enginestr;
    current.engine = enginename;
    
    //TODO: Code
    
    
    
    toggleChangeEnginePopup(false);
}