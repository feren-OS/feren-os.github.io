var eng = {},
	current = {},
    searchEnginesBoxHeight = 0,
    UA=navigator.userAgent,
    fallbackbgurl = "https://source.unsplash.com/collection/19065423",
    fallbackbgcolor = "rgb(0, 106, 255)",
	fadeDur = 350,
    halffadeDur = 175,
    predefinedtiles = 7,
    fallbacktileurl = "";
    
var urlParams = new URLSearchParams(window.location.search);

// Tiles configurations
var DefaultTileURLs = [
    "",
    "https://ferenos.weebly.com",
    "https://medium.com/feren-os",
    "https://feren-os-user-guide.readthedocs.io",
    "https://ferenos.weebly.com/discord",
    "https://twitter.com/Feren_OS",
    "https://chrome.google.com/webstore",
    "https://vivaldi.net",
    "https://facebook.com",
    "https://twitter.com"
]
var DefaultTileNames = [
    "",
    "Feren OS Website",
    "Feren OS News",
    "Feren OS User Guide",
    "Feren Community Discord",
    "Feren OS on Twitter",
    "Get More Extensions",
    "Vivaldi Community",
    "Facebook",
    "Twitter"
]
var DefaultTileImages = [
    "",
    "resources/sd_feren-os.png",
    "resources/sd_feren-news.png",
    "resources/sd_feren-guide.png",
    "resources/sd_discord_feren.png",
    "resources/sd_twitter_feren.png",
    "resources/sd_chrome_extensions.png",
    "resources/sd_vivaldi_community.png",
    "resources/sd_facebook.png",
    "resources/sd_twitter.png",
    "resources/sd_feren.png",
    "resources/sd_vivaldi.png",
    "resources/sd_generic.png",
    "resources/sd_unsplash.png",
    "resources/sd_wikipedia.png",
    "resources/sd_discord.png"
]


function setCookie(name, value) {
    var expires = "";
    expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    policy = "; SameSite=Lax; Secure";
    document.cookie = name + "=" + (value || "") + expires + policy;
}

function getCookie(cname) {
    var match = document.cookie.match(new RegExp('(^| )' + cname + '=([^;]+)'));
    if (match) return match[2];
}


window.addEventListener('resize', function(event) {
    calculateHeights();
}, true);


function loadSP() {    
    // Migrate settings if required
    migrateSettings();
    
    // Create Engine Index
    buildEngineslist();
	
    // Set up first engine

    current.engine = (getCookie("lastengine") || "duckduckgo");
    selectEngine(current.engine, false);
    
    // Hover events
    setupHoverEvents();
    
    // Start clock
    startTime();
    
    // Load settings
    setSettings();
    
    // Browser optimisations
    browserOptimisationsSP();
    
    // Cookies Popup
    cookiesPopup();
    
    // Generate tiles
    loadTilesCall();
    
    // Calculate heights
    calculateHeights();
}


function loadSPIce() {
    // Migrate settings if required
    migrateSettings();
    
    // Create Engine Index
    buildEngineslist();
    
    // Resize Engines dialog
    calculateEnginesSize();
	
    // Set up first engine

    current.engine = (getCookie("lastengine") || "duckduckgo");
    selectEngine(current.engine, false);
    
    // Start clock
    startTime();
    
    // Cookies Popup
    cookiesPopup();
    
    //Flavour text
    const iceText = urlParams.get('ice-text')
    
    document.getElementById('iceid').innerHTML=iceText;
    
    // Calculate heights
    calculateHeights();
}


function setSettings() {
    //Set the settings values
    //Background
    var bgvalue = (getCookie("userbg") || fallbackbgurl);
    if (bgvalue.startsWith("color:")) {
        document.getElementById("bgcolor").checked = true;
        document.getElementById("bgclrtextbox").disabled = false;
        document.getElementById("bgclrtextbox").value = bgvalue.replace("color:", "");
    } else {
        document.getElementById("bgimage").checked = true;
        document.getElementById("bgurltextbox").disabled = false;
        document.getElementById("bgurltextbox").value = bgvalue;
    }
    //Clock
    var use12hrclock = (getCookie("12hrclock") || false);
    document.getElementById("12hrclock").checked = use12hrclock;
    document.getElementById("24hrclock").checked = !use12hrclock;
    
    //Load the background
    setBG();
    
    //Hook up settings triggers
    //Background
    document.getElementById("bgcolor").setAttribute("onchange", "onBGTypeChanged();");
    document.getElementById("bgclrtextbox").setAttribute("oninput", "onBGChanged();");
    document.getElementById("bgimage").setAttribute("onchange", "onBGTypeChanged();");
    document.getElementById("bgurltextbox").setAttribute("oninput", "onBGChanged();");
    //Clock
    document.getElementById("12hrclock").setAttribute("onchange", "onTimeFormatChanged();");
    document.getElementById("24hrclock").setAttribute("onchange", "onTimeFormatChanged();");
}


function calculateHeights() {
    
    var searchEnginesColumns = Math.floor((window.innerWidth * 0.8) / 310);
    document.getElementById("searchenginepopup").style.width = (250 * searchEnginesColumns) + 56;
    var searchEnginesCount = 0;
    for (e in eng) {
        searchEnginesCount += 1
    }
    var targetHeight = 62 + (80 * Math.ceil(searchEnginesCount / searchEnginesColumns));
    if ((window.innerHeight * 0.7) < targetHeight) {
        document.getElementById("searchenginepopup").style.height = "100%";
    } else {
        document.getElementById("searchenginepopup").style.height = targetHeight + 32;
    }
    
    var settingsShown = (document.getElementById("settingspopup").style.display == "block");
    if (settingsShown == false) {
        document.getElementById("settingspopup").style.opacity = "0";
        document.getElementById("settingspopup").style.display = "block";
    }
    if (window.innerHeight < document.getElementById("settingsarea").offsetHeight) {
        document.getElementById("settingspopup").style.height = "100%";
    } else {
        document.getElementById("settingspopup").style.height = document.getElementById("settingsarea").offsetHeight + 32;
    }
    if (settingsShown == false) {
        document.getElementById("settingspopup").style.display = "none";
        document.getElementById("settingspopup").style.opacity = null;
    }
}


function browserOptimisationsSP() {
    if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(UA) && /Firefox\/(\S+)/.test(UA)) { /*Firefox*/
        //Switch id of scrollbox to non-chromium
        document.getElementById("shortcutscontainer1").id = "shortcutscontainer1-nonium";
    }
}

function doSearch() {
	var url = eng[current.engine].uri;
    url = url.replace("%query%", encodeURIComponent($("#i").val()));
	if (typeof eng[current.engine].languages == "object") 
		url = url.replace("%lang%", eng[current.engine].languages[current.language]);
	
    const pwaMode = urlParams.get('pwa')
    
    if (pwaMode != "true") {    
        window.location.href = url;
    } else {
        window.open(url);
    }
        
//     var davetheiframe = document.createElement("iframe");
//     davetheiframe.src = url;
//     davetheiframe.title = "Search";
//     davetheiframe.style.width = "100%";
//     davetheiframe.style.height = "100%";
//     davetheiframe.style.border = "none";
//     davetheiframe.setAttribute("referrerpolicy", "no-referrer");
//     davetheiframe.setAttribute("sandbox", "allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts");
//     davetheiframe.setAttribute("pointer-events", "initial");
//     
//         
//     document.getElementById("iframepage").innerHTML = "";
//     document.getElementById("iframepage").appendChild(davetheiframe);
//     
//     document.getElementById("mainpage").style.display="none";
//     document.getElementById("iframepage").style.display="block";
    
	return false;
}

function buildEngineslist() {
    for (e in eng) {
        var searchenginescontaineritem = document.createElement("div");
        searchenginescontaineritem.classList.add("searchenginescontaineritem");
        searchenginescontaineritem.setAttribute("onclick", "selectEngine('" + e + "', true)");
        
        document.getElementById("searchenginescontainer").appendChild(searchenginescontaineritem);
        
        var searchengineitem = document.createElement("img");
        searchengineitem.classList.add("searchenginesitem");
        searchengineitem.src = eng[e].logo;
        
        searchenginescontaineritem.appendChild(searchengineitem);
    }
}

function nextEngine() {
	selectEngine(findNext(eng, current.engine), true);
}

function prevEngine() {
	selectEngine(findPrevious(eng, current.engine), true);
}


/*  CUSTOM BG SUPPORT
    -----------------------------------------------------  */
function setBG() {
    var bgurl = (getCookie('userbg') || fallbackbgurl)
    
    if (bgurl.startsWith("color:")) {
        var colorval = bgurl.replace("color:", "")
        document.getElementById("bgparallax").style.backgroundImage = ("linear-gradient(to bottom, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0)), linear-gradient("+colorval+", "+colorval+")")
    } else {
        document.getElementById("bgparallax").style.backgroundImage = ("linear-gradient(to bottom, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0)), url("+bgurl+")")
    }
}

function onBGTypeChanged() {
    if (document.getElementById("bgcolor").checked == true) {
        if (document.getElementById("bgclrtextbox").value == "") {
            document.getElementById("bgclrtextbox").value = fallbackbgcolor;
        }
        document.getElementById("bgclrtextbox").disabled = false;
        document.getElementById("bgurltextbox").disabled = true;
    } else if (document.getElementById("bgimage").checked == true) {
        if (document.getElementById("bgurltextbox").value == "") {
            document.getElementById("bgurltextbox").value = fallbackbgurl;
        }
        document.getElementById("bgurltextbox").disabled = false;
        document.getElementById("bgclrtextbox").disabled = true;
    }
    
    onBGChanged();
}

function onBGChanged() {
    if (document.getElementById("bgcolor").checked == true) {     
        setCookie("userbg", "color:"+document.getElementById("bgclrtextbox").value);
    } else if (document.getElementById("bgimage").checked == true) {
        setCookie("userbg", document.getElementById("bgurltextbox").value);
    }
    
    setBG();
}

/*	TIME
	-----------------------------------------------------  */

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    // add a zero in front of numbers less than 10
    m=checkTime(m);
    
    if (getCookie("12hrclock") == "true") {
        if (h >= 12 && h != 24) {
            h = h - 12
            if (h == 0) {
                h = 12
            }
            timesuffix="PM"
        } else if (h == 0) {
            h = 12
            timesuffix="AM"
        } else {
            timesuffix="AM"
        }
        h=checkTime(h);
        document.getElementById('timeid').innerHTML=h+":"+m+" "+timesuffix;
    } else {
        if (h == 24) {
            h = 0
        }
        h=checkTime(h);
        document.getElementById('timeid').innerHTML=h+":"+m;
    }
    
    t=setTimeout('startTime()',3000);
}

function checkTime(i) {
    if (i<10) {
        i="0" + i;
    }
    return i;
}

function onTimeFormatChanged() {
    setCookie("12hrclock", document.getElementById("12hrclock").checked);
}

/*	KEYBOARD SHORTCUTS
	-----------------------------------------------------  */

var isCtrl = false;
var isCmd = false;

$(document).keyup(function(e) {
	if (e.which == 17) isCtrl=false;
	if (e.which == 91) isCmd=false;	
}
).keydown(function(e) {
	if (e.which == 17) isCtrl=true;
	if (e.which == 91) isCmd=true;

    if (e.which == 37 && isCtrl == true)				{ /* Arrow Left */	prevEngine(); toggleChangeEnginePopup(false); }
	if (e.which == 39 && isCtrl == true)				{ /* Arrow Right */	nextEngine(); toggleChangeEnginePopup(false); }
});



/*	SHORTCUTS SCROLLING
	-----------------------------------------------------  */
var h_amount = '';
function scroll_h() {
    $('#shortcutscontainer1').animate({
        scrollLeft: h_amount
    }, 100, 'linear',function() {
        if (h_amount != '') {
            scroll_h();
        }
    });
}

function setupHoverEvents() {
    var bottomshortcutsarea = document.getElementById("shortcutscontainer1");
    var leftscrollarea = document.getElementById("direction_left");
    var rightscrollarea = document.getElementById("direction_right");

    bottomshortcutsarea.addEventListener("mouseenter", function( event ) {
        $("#shortcutscontainer1").addClass("shownscrollbar");
    }, false);
    bottomshortcutsarea.addEventListener("mouseleave", function( event ) {
        $("#shortcutscontainer1").removeClass("shownscrollbar");
    }, false);


    $('.direction_left').hover(function() {
        h_amount = '-=50';
        scroll_h();
    }, function() {
        h_amount = '';
    });
    $('.direction_right').hover(function() {
        h_amount = '+=50';
        scroll_h();
    }, function() {
        h_amount = '';
    });
}





function toggleSettingsPopup(show) {
    
    if (show == true) {
        $("#overlay").fadeIn(halffadeDur);
        $("#settingspopup").fadeIn(halffadeDur);
    } else {
        $("#overlay").fadeOut(halffadeDur);
        $("#settingspopup").fadeOut(halffadeDur);
    }
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
















function migrateSettings() {
    if (getCookie("lastconfigmigration") == "202202") {
        return;
    }
    
    // Transition from original Start Page design
    if (getCookie("userbg") == "../start-page/resources/bg.jpg") {
        setCookie("userbg", fallbackbgurl);
    }
    
    // Alles was removed
    if (getCookie("lastengine") == "alles") {
        setCookie("lastengine", "duckduckgo");
    }
    
    // Change Vivaldi Community tile image to new tile
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
    
    // Update default tiles count
    if (getCookie("tilescurrentcount") === undefined || getCookie("tilescurrentcount") === null || getCookie("tilescurrentcount") == 8) {
        setCookie("tilescurrentcount", predefinedtiles);
    }
    
    // Update default tiles to new configs //
    // Tile 2: Vivaldi.net -> Feren OS News
    if (getCookie("tile2currentimage") == "resources/sd_vivaldi_community.png") {
        setCookie("tile2currentimage", "resources/sd_feren-news.png");
    }
    if (getCookie("tile2currentname") == "Vivaldi Community") {
        setCookie("tile2currentname", "Feren OS News");
    }
    if (getCookie("tile2currenturl") == "https://vivaldi.net/" || getCookie("tile2currenturl") == "https://vivaldi.net") {
        setCookie("tile2currenturl", "https://medium.com/feren-os");
    }
    
    // Tile 3: Feren Community Discord -> Feren OS User Guide
    if (getCookie("tile3currentimage") == "resources/sd_discord_feren.png") {
        setCookie("tile3currentimage", "resources/sd_feren-guide.png");
    }
    if (getCookie("tile3currentname") == "Feren Community Discord") {
        setCookie("tile3currentname", "Feren OS User Guide");
    }
    if (getCookie("tile3currenturl") == "https://ferenos.weebly.com/discord") {
        setCookie("tile3currenturl", "https://feren-os-user-guide.readthedocs.io");
    }
    
    // Tile 4: Feren OS on Twitter -> Feren Community Discord
    if (getCookie("tile4currentimage") == "resources/sd_twitter_feren.png") {
        setCookie("tile4currentimage", "resources/sd_discord_feren.png");
    }
    if (getCookie("tile4currentname") == "Feren OS on Twitter") {
        setCookie("tile4currentname", "Feren Community Discord");
    }
    if (getCookie("tile4currenturl") == "https://twitter.com/Feren_OS") {
        setCookie("tile4currenturl", "https://ferenos.weebly.com/discord");
    }
    
    // Tile 5: Get More Extensions -> Feren OS on Twitter
    if (getCookie("tile5currentimage") == "resources/sd_chrome_extensions.png") {
        setCookie("tile5currentimage", "resources/sd_twitter_feren.png");
    }
    if (getCookie("tile5currentname") == "Get More Extensions") {
        setCookie("tile5currentname", "Feren OS on Twitter");
    }
    if (getCookie("tile5currenturl") == "https://chrome.google.com/webstore") {
        setCookie("tile5currenturl", "https://twitter.com/Feren_OS");
    }
    
    // Tile 6: OMG! Ubuntu -> Get More Extensions
    if (getCookie("tile6currentimage") == "resources/sd_omgubuntu.png") {
        setCookie("tile6currentimage", "resources/sd_chrome_extensions.png");
    }
    if (getCookie("tile6currentname") == "OMG! Ubuntu") {
        setCookie("tile6currentname", "Get More Extensions");
    }
    if (getCookie("tile6currenturl") == "https://omgubuntu.co.uk/" || getCookie("tile6currenturl") == "https://omgubuntu.co.uk") {
        setCookie("tile6currenturl", "https://chrome.google.com/webstore");
    }
    
    // Tile 7: Facebook -> Vivaldi Community
    if (getCookie("tile7currentimage") == "resources/sd_facebook.png") {
        setCookie("tile7currentimage", "resources/sd_vivaldi_community.png");
    }
    if (getCookie("tile7currentname") == "Facebook") {
        setCookie("tile7currentname", "Vivaldi Community");
    }
    if (getCookie("tile7currenturl") == "https://facebook.com/" || getCookie("tile7currenturl") == "https://facebook.com") {
        setCookie("tile7currenturl", "https://vivaldi.net");
    }
    
    setCookie("lastconfigmigration", "202202");
}

function getbg() {
    var bgurltext = (getCookie("userbg") || fallbackbgurl);
    document.getElementById("bgurltextbox").value = bgurltext;
}

function gettickboxesstates() {
    var use12hrclock = (getCookie("12hrclock") || false);
    document.getElementById("toggle12hrclock").checked = use12hrclock;
}




/*	TILES
	-----------------------------------------------------  */
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

function loadTilesCall() {
    const shortcutscontainers = ["shortcutscontainer", "settingsshortcutscontainer"];
    shortcutscontainers.forEach(loadTiles);
}

function loadTiles(elemnt, index) {
    var i;
    var tilescount = getCookie("tilescurrentcount") || predefinedtiles;
    
    if (!document.getElementById(elemnt)) {
        console.log(elemnt+" nope")
        return;
    }
    
    // Clear the current entries
    document.getElementById(elemnt).innerHTML = '';
    
    for (i=1; i <= tilescount; i++) {
        
        var shortcutscontaineritem = document.createElement("div");
        shortcutscontaineritem.classList.add("grid-item");
        shortcutscontaineritem.id = "tilestandard";
        
        document.getElementById(elemnt).appendChild(shortcutscontaineritem);
        
        var startpageitem = document.createElement("div");
        startpageitem.classList.add("sd-item");
        startpageitem.id = "tile"+i+"image";
        var startpagesubitem = document.createElement("img");
        
        var startpageitemurl = document.createElement("a");
        startpageitemurl.id = "tile"+i+"url";
        
        // If we're in the Settings page, then add grid-item-contents
        if (elemnt.startsWith("settings", 0)) {
            var griditemspan = document.createElement("span");
            griditemspan.classList.add("grid-item-contents");
            shortcutscontaineritem.appendChild(griditemspan);
        }
        
        shortcutscontaineritem.appendChild(startpageitemurl);
        startpageitemurl.appendChild(startpageitem);
        
        if (getCookie("tile" + i + "usestext") == "true") {
            startpagesubitem.src = generateImage(getCookie("tile" + i + "currentimage").substr(5));
        } else {
            if (i <= predefinedtiles ) { // Is the tile in the predefined list?
                startpagesubitem.src = (getCookie("tile" + i + "currentimage") || DefaultTileImages[i]);
            } else {
                startpagesubitem.src = (getCookie("tile" + i + "currentimage") || "resources/sd_generic.png");
            }
        }
        
        startpageitem.appendChild(startpagesubitem);
        
        // Check if we"re not in the Settings page when trying to set tile links
        if (!elemnt.startsWith("settings", 0)) {
            if (i <= predefinedtiles ) { // Is the tile in the predefined list?
                startpageitemurl.href = (getCookie("tile" + i + "currenturl") || DefaultTileURLs[i]);
            } else {
                startpageitemurl.href = (getCookie("tile" + i + "currenturl") || fallbacktileurl);
            }
        } else {
            shortcutscontaineritem.setAttribute("onclick", "openTileSettings(" + i + ")");
        }
    }
    
    // Add dummy item for right-side spacing
    if (!elemnt.startsWith("settings", 0)) {
        var dummystartpageitem = document.createElement("img");
        dummystartpageitem.classList.add("sd-dummy");
        dummystartpageitem.src = "resources/sd_blank.png";
        document.getElementById(elemnt).appendChild(dummystartpageitem);
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
        document.getElementById("currenttileurltextbox").value = (getCookie("tile" + tile + "currenturl") || fallbacktileurl);
        document.getElementById("currenttileurltextbox").placeholder = fallbacktileurl;
    }
    
    if (tile <= predefinedtiles ) { // Is the tile in the predefined list?
        document.getElementById("currenttileimagetextbox").value = (getCookie("tile" + tile + "currentimage") || DefaultTileImages[tile]);
        document.getElementById("currenttileimagetextbox").placeholder = DefaultTileImages[tile];
    } else {
        document.getElementById("currenttileimagetextbox").value = (getCookie("tile" + tile + "currentimage") || "resources/sd_generic.png");
        document.getElementById("currenttileimagetextbox").placeholder = "resources/sd_generic.png";
    }
    
    document.getElementById("overlay").style.zIndex = 9000002;
    $("#tilesettingspopup").fadeIn(halffadeDur);
}

function minusTile() {
    var tilescurrentcount = parseInt(getCookie("tilescurrentcount")) || 7;
    setCookie("tilescurrentcount", (tilescurrentcount - 1));
    loadTilesCall();
}

function plusTile() {
    var tilescurrentcount = parseInt(getCookie("tilescurrentcount")) || 7;
    setCookie("tilescurrentcount", (tilescurrentcount + 1));
    loadTilesCall();
}

function closeTileSettings() {
    loadTilesCall();
    $("#tilesettingspopup").fadeOut(halffadeDur);
    document.getElementById("overlay").style.zIndex = 9000000;
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


function selectEngine(enginename, changecookie) {
    if (changecookie == true) {
        setCookie("lastengine", enginename);
    }
    
    document.getElementById("searchenginestr").innerHTML = eng[enginename].enginestr;
    current.engine = enginename;
    
    toggleChangeEnginePopup(false);
}
