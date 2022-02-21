var eng = {},
	current = {},
	fadeDur = 350,
    searchPrefix = "Search ",
    UA=navigator.userAgent,
    searchEnginesBoxHeight = 0;
    
var urlParams = new URLSearchParams(window.location.search);


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
    
	return false;
        
//     var davetheiframe = document.createElement("iframe");
//     davetheiframe.src = url;
//     davetheiframe.title = "Search";
//     davetheiframe.style.width = "100%";
//     davetheiframe.style.height = "100%";
//     davetheiframe.style.border = "none";
    
        
//     document.getElementById("iframepage").innerHTML = "";
//     document.getElementById("iframepage").appendChild(davetheiframe);
//     
//     document.getElementById("mainpage").style.display="none";
//     document.getElementById("iframepage").style.display="block";
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
    var bgurl = (getCookie('userbg') || "https://source.unsplash.com/collection/19065423")
    
    if (bgurl.startsWith("color:")) {
        var colorval = bgurl.replace("color:", "")
        document.getElementById("bgparallax").style.backgroundImage = ("linear-gradient(to bottom, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0)), linear-gradient("+colorval+", "+colorval+")")
    } else {
        document.getElementById("bgparallax").style.backgroundImage = ("linear-gradient(to bottom, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0)), url("+bgurl+")")
    }
}

function setSettings() {
    setBG();
}

function pageLoadedAnim() {
    $(".blackscreen").fadeOut(500);
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
