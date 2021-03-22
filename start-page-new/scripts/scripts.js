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

$(function()
{	
	// Create Engine Index
	
	indexCreate();
	
	// Set up first engine

    current.engine = (getCookie("lastengine") || "duckduckgo");
	build(current.engine, false);
});

function doSearch()
{
	var url = eng[current.engine].places[current.place][0];
		url = url.replace("%query%", encodeURIComponent($("#i").val()));
	if (typeof eng[current.engine].languages == "object") 
		url = url.replace("%lang%", eng[current.engine].languages[current.language]);
	
	//window.location.href = url;
	return false;
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
	
	if (e.which == 37 && isCtrl == true)				{ /* Arrow Left */	prevEngine(); }
	if (e.which == 39 && isCtrl == true)				{ /* Arrow Right */	nextEngine(); }
});