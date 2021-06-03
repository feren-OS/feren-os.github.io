var fadeDur = 350,
    halffadeDur = 175,
    predefinedtiles = 8,
    fallbackwebsite = "";


// Tiles configurations
var DefaultTileURLs = [
    "",
    "https://ferenos.weebly.com",
    "https://vivaldi.net/",
    "https://ferenos.weebly.com/discord",
    "https://twitter.com/Feren_OS",
    "https://chrome.google.com/webstore",
    "https://omgubuntu.co.uk/",
    "https://facebook.com/",
    "https://twitter.com/"
]
var DefaultTileNames = [
    "",
    "Feren OS Website",
    "Vivaldi Community",
    "Feren Community Discord",
    "Feren OS on Twitter",
    "Get More Extensions",
    "OMG! Ubuntu",
    "Facebook",
    "Twitter"
]
var DefaultTileImages = [
    "",
    "resources/sd_feren-os.png",
    "resources/sd_vivaldi_community.png",
    "resources/sd_discord_feren.png",
    "resources/sd_twitter_feren.png",
    "resources/sd_chrome_extensions.png",
    "resources/sd_omgubuntu.png",
    "resources/sd_facebook.png",
    "resources/sd_twitter.png",
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
    policy = "; SameSite=Lax; Secure";
    document.cookie = name + "=" + (value || "") + expires + policy;
}

function getCookie(cname)
{
    var match = document.cookie.match(new RegExp('(^| )' + cname + '=([^;]+)'));
    if (match) return match[2];
}

function migrateSettings() {
    if (getCookie("lastconfigmigration") == "202104") {
        return;
    }
    
    if (getCookie("userbg") == "../start-page/resources/bg.jpg") {
        setCookie("userbg", "https://source.unsplash.com/collection/19065423");
    }
    if (getCookie("lastengine") == "alles") {
        setCookie("lastengine", "duckduckgo");
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
    
    if (getCookie("tilescurrentcount") === undefined || getCookie("tilescurrentcount") === null ) {
        setCookie("tilescurrentcount", predefinedtiles);
    }
    
    setCookie("lastconfigmigration", "202104");
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
    tCtx.fillText(text, (tCtx.canvas.width / 2), (tCtx.canvas.height / 2) + 5);
    return tCtx.canvas.toDataURL();
}

function loadTiles() {
    var i;
    var tilescount = getCookie("tilescurrentcount") || predefinedtiles;
    // Clear the current entries
    document.getElementById("shortcutscontainer").innerHTML = '';
    for (i=1; i <= tilescount; i++) {
        
        var shortcutscontaineritem = document.createElement("div");
        shortcutscontaineritem.classList.add("grid-item");
        shortcutscontaineritem.id = "tilestandard";
        
        document.getElementById("shortcutscontainer").appendChild(shortcutscontaineritem);
        
        var startpageitem = document.createElement("img");
        startpageitem.classList.add("sd-item");
        startpageitem.id = "tile"+i+"image";
        
        var startpageitemurl = document.createElement("a");
        startpageitemurl.id = "tile"+i+"url";
        
        // If we"re in the Settings page, then add grid-item-contents
        if (Boolean(location.href.search("settings") == -1) == false) {
            var griditemspan = document.createElement("span");
            griditemspan.classList.add("grid-item-contents");
            shortcutscontaineritem.appendChild(griditemspan);
        }
        
        shortcutscontaineritem.appendChild(startpageitemurl);
        startpageitemurl.appendChild(startpageitem);
        
        if (getCookie("tile" + i + "usestext") == "true") {
            startpageitem.src = generateImage(getCookie("tile" + i + "currentimage").substr(5));
        } else {
            if (i <= predefinedtiles ) { // Is the tile in the predefined list?
                startpageitem.src = (getCookie("tile" + i + "currentimage") || DefaultTileImages[i]);
            } else {
                startpageitem.src = (getCookie("tile" + i + "currentimage") || "resources/sd_generic.png");
            }
        }
        
        // Check if we"re not in the Settings page when trying to set tile links
        if (Boolean(location.href.search("settings") == -1) == true) {
            if (i <= predefinedtiles ) { // Is the tile in the predefined list?
                startpageitemurl.href = (getCookie("tile" + i + "currenturl") || DefaultTileURLs[i]);
            } else {
                startpageitemurl.href = (getCookie("tile" + i + "currenturl") || fallbackwebsite);
            }
        } else {
            shortcutscontaineritem.setAttribute("onclick", "openTileSettings(" + i + ")");    
        }
    }
    
    // Add dummy item for right-side spacing
    if (Boolean(location.href.search("settings") == -1) == true) {
        var dummystartpageitem = document.createElement("img");
        dummystartpageitem.classList.add("sd-item");
        dummystartpageitem.src = "resources/sd_blank.png";
        document.getElementById("shortcutscontainer").appendChild(dummystartpageitem);
    }
}

function openTileSettings(tile) {
    //currenttilenumber is used in the settings popout dialog
    document.getElementById("currenttilenumber").innerHTML = tile;
    
    if (tile <= predefinedtiles ) { // Is the tile in the predefined list?
        document.getElementById("currenttilenametextbox").value = (getCookie("tile" + tile + "currentname") || DefaultTileNames[tile]);
        document.getElementById("currenttilenametextbox").placeholder = DefaultTileNames[tile];
    } else {
        document.getElementById("currenttilenametextbox").value = (getCookie("tile" + tile + "currentname") || "");
        document.getElementById("currenttilenametextbox").placeholder = "";    
    }
    
    if (tile <= predefinedtiles ) { // Is the tile in the predefined list?
        document.getElementById("currenttileurltextbox").value = (getCookie("tile" + tile + "currenturl") || DefaultTileURLs[tile]);
        document.getElementById("currenttileurltextbox").placeholder = DefaultTileURLs[tile];
    } else {
        document.getElementById("currenttileurltextbox").value = (getCookie("tile" + tile + "currenturl") || fallbackwebsite);
        document.getElementById("currenttileurltextbox").placeholder = fallbackwebsite;
    }
    
    if (tile <= predefinedtiles ) { // Is the tile in the predefined list?
        document.getElementById("currenttileimagetextbox").value = (getCookie("tile" + tile + "currentimage") || DefaultTileImages[tile]);
        document.getElementById("currenttileimagetextbox").placeholder = DefaultTileImages[tile];
    } else {
        document.getElementById("currenttileimagetextbox").value = (getCookie("tile" + tile + "currentimage") || "resources/sd_generic.png");
        document.getElementById("currenttileimagetextbox").placeholder = "resources/sd_generic.png";
    }
    
    $("#overlay").fadeIn(halffadeDur);
    $("#tilesettingspopup").fadeIn(halffadeDur);
}

function minusTile() {
    var tilescurrentcount = parseInt(getCookie("tilescurrentcount")) || 8;
    setCookie("tilescurrentcount", (tilescurrentcount - 1));
    loadTiles();
    console.log(getCookie("tilescurrentcount"));
}

function plusTile() {
    var tilescurrentcount = parseInt(getCookie("tilescurrentcount")) || 8;
    setCookie("tilescurrentcount", (tilescurrentcount + 1));
    loadTiles();
    console.log(getCookie("tilescurrentcount"));
}

function closeTileSettings() {
    loadTiles();
    $("#overlay").fadeOut(halffadeDur);
    $("#tilesettingspopup").fadeOut(halffadeDur);
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
    setCookie("userbg", document.getElementById("bgurltextbox").value);
    setCookie("12hrclock", document.getElementById("toggle12hrclock").checked);
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
        $(".searchenginesscrollbox").addClass("dialogscrollbar");
        $("#overlay").fadeIn(halffadeDur);
        $("#searchenginepopup").fadeIn(halffadeDur);
    } else {
        $(".searchenginesscrollbox").removeClass("dialogscrollbar");
        $("#overlay").fadeOut(halffadeDur);
        $("#searchenginepopup").fadeOut(halffadeDur);
    }

}
function selectEngine(enginename, changecookie) {
    if (changecookie == true) {
        setCookie("lastengine", enginename);
    }
    
    document.getElementById("searchenginestr").innerHTML = eng[enginename].enginestr;
    current.engine = enginename;
    
    toggleChangeEnginePopup(false);
}

function cookiesPopup() {
    if (getCookie("cookieconsent_status") == "dismiss") {
        // Give search box focus
        $("#input input").focus();
    
        return;
    }
    setCookie("cookieconsent_status", "shown");
    
    if (getCookie("cookieconsent_status") != "shown") {
        return;
    }
    $("#overlay").fadeIn(halffadeDur);
    $("#cookiepopup").fadeIn(halffadeDur);
    
    // Give cookies button focus
    document.getElementById("cookieshutbtn").focus();
}
function shutCookies() {
    setCookie("cookieconsent_status", "dismiss");
    $("#overlay").fadeOut(halffadeDur);
    $("#cookiepopup").fadeOut(halffadeDur);
    
    // Give search box focus
    $("#input input").focus();
}