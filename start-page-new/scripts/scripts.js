var eng = {},
	current = {},
	fadeDur = 350,
    searchPrefix = "Search ";


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

function loadSP()
{	
	// Create Engine Index
	
	//buildEngineslist()
	
	// Set up first engine

    current.engine = (getCookie("lastengine") || "duckduckgo");
	selectEngine(current.engine, false);
    
    // Start clock
    startTime();
    
    // Load settings
    setSettings();
    
    // Give search box focus
	$("#input input").focus();
}

function doSearch()
{
	var url = eng[current.engine].uri;
    url = url.replace("%query%", encodeURIComponent($("#i").val()));
	if (typeof eng[current.engine].languages == "object") 
		url = url.replace("%lang%", eng[current.engine].languages[current.language]);
	
	window.location.href = url;
	return false;
}

function nextEngine() 
{
	selectEngine(findNext(eng, current.engine), true);
}

function prevEngine() 
{
	selectEngine(findPrevious(eng, current.engine), true);
}


/*  CUSTOM BG SUPPORT
    -----------------------------------------------------  */
function setBG()
{
    var bgurl = (getCookie('userbg') || "https://source.unsplash.com/collection/19065423")
    document.getElementById("bgparallax").style.backgroundImage = ("linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url("+bgurl+")")
}

function setSettings()
{
    var bgurl = (getCookie('userbg') || "https://source.unsplash.com/collection/19065423");

    var bgimage = new Image();      
    bgimage.src=bgurl;

    $(bgimage).load(function() {
        document.getElementById("bgparallax").style.backgroundImage = ("linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("+bgurl+")");
        $(".blackscreen").fadeOut(500); 
    });
}

/*	TIME
	-----------------------------------------------------  */

function startTime()
{
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    // add a zero in front of numbers less than 10
    m=checkTime(m);
    
    if (getCookie("24hrclock") == false) {
        if (h >= 12 && h != 24) {
            h = h - 12
            timesuffix="PM"
        } else if (h == 24) {
            h = 0
            timesuffix="AM"
        } else {
            timesuffix="AM"
        }
        document.getElementById('timeid').innerHTML=h+":"+m+" "+timesuffix;
    } else {
        document.getElementById('timeid').innerHTML=h+":"+m;
    }
    
    t=setTimeout('startTime()',3000);
}

function checkTime(i)
{
    if (i<10) {
        i="0" + i;
    }
    return i;
}

/*	KEYBOARD SHORTCUTS
	-----------------------------------------------------  */

var isCtrl = false;
var isCmd = false;

$(document).keyup(function(e) 
{
	if (e.which == 17) isCtrl=false;
	if (e.which == 91) isCmd=false;	
}
).keydown(function(e) 
{
	if (e.which == 17) isCtrl=true;
	if (e.which == 91) isCmd=true;
	
	if (e.which == 39 && isCtrl == true)				{ /* Arrow Right */	nextEngine(); }
});