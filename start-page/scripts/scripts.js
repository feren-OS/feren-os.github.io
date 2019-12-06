
var eng = {},
	current = {},
	fadeDur = 200,
	titlePrefix = "Feren OS Start Page - ",
	
	idxWidth = 900,
	idxLogoFull  = [225,80],
	idxLogoSmall = [157,56],
	idxMargin = 24,
	idxFadedOpacity = 0.3,
	idxHeight = 0;

var buildcount = 0;

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

function firstRun()
{
    ua = navigator.userAgent.toLowerCase();
    // Is Vivaldi the browser and are we on Linux (e.g.: Feren OS)?
    if (ua.indexOf('vivaldi') !== -1 && (navigator.appVersion.indexOf("Linux")!=-1 || navigator.appVersion.indexOf("X11")!=-1)) {
	    if (getCookie("vivaldifirstrun") !== "1") {
		    setCookie("vivaldifirstrun", "0");
		    if (getCookie("vivaldifirstrun") == "0") {
			    setCookie("vivaldifirstrun", "1");
			    window.location.href = "https://feren-os.github.io/vivaldi-welcome/";
		    }
	    }
    }
}

$(function()
{
	// Vivaldi First Run check
	firstRun();
	
	// Create Engine Index
	
	indexCreate();
	
	// Behavior
	
	$("#i").keyup(function(ev) 		{ fetchSuggestions(ev.which); });
	$(document).click(function(ev) 	{ closeSugBox(ev.srcElement) });

	$("#toggleInfo").click(function(){
		$("#infoBox").toggle(400);
	});
	
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
	
	window.location.href = url;
	return false;
}


/*  CUSTOM BG SUPPORT
    -----------------------------------------------------  */
function setBG()
{
    var bgurl = (getCookie('userbg') || "../start-page/resources/bg.jpg")
    document.getElementById("bgparallax").style.backgroundImage = ("linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url("+bgurl+")")
}

function setSettings()
{
    var bgurl = (getCookie('userbg') || "../start-page/resources/bg.jpg");
    document.getElementById("bgparallax").style.backgroundImage = ("linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url("+bgurl+")");
    
    var hidetiles = getCookie('hidetiles');
    var hideblog = getCookie('hideblog');
    var hidecredits = getCookie('hidecredits');
    if (hidetiles == "true" && hideblog == "true" && hidecredits == "true") {
        window.location.href = "https://feren-os.github.io/start-page/legacy";
    }
    if (hidetiles == "true") {
        $('.shortcutscontainer').hide();
    }
    if (hideblog == "true") {
        $('.blog-item').hide();
    }
    if (hidecredits == "true") {
        $('.disclaimers').hide();
    }
}


/*	ENGINE INDEX
	-----------------------------------------------------  */
	
function indexCreate()
{
	var row = 0,
		i = 0, // Reset every row
		j = 0, // Total
		offset = 0,
		cols = Math.floor(idxWidth/idxLogoSmall[0]); //This determines how many columns are allowed before another row is created.
	
	for (e in eng) 
	{
		// If the offset hasn't been set yet
		// And the number of engines left to draw is <= items in the final row
		if (
			offset == 0 && 
			(numKeys(eng) - j) <= (numKeys(eng) % cols)
		) {
			offset = cols - numKeys(eng) % cols;
			offset = offset * (idxLogoSmall[0]+idxMargin) / 2;
		}
		
		$("#engines").prepend("<a id='"+e+"_logo' ref='"+e+"'><img src='engines/"+eng[e].logo+"'></a>");
		
		if (i == cols) { i=0; row++; };
		eng[e].idxPos = [
			(idxLogoSmall[0]+idxMargin)*i - idxWidth/2 + offset,
			(idxLogoSmall[1]+idxMargin)*row
		];
		i++; j++;
	}
	idxHeight = (row+1)*(idxLogoSmall[1]+idxMargin)-idxMargin;
	idxHeight = Math.max(idxHeight, idxLogoFull[1]);

    var engine = (getCookie("lastengine") || "duckduckgo");
    current.engine = engine;
	
	$("#engines a").click(function(){ build($(this).attr("ref"), true); });
	
	$("#engines a").css({
		"left": "50%",
		"bottom": "0",
		"marginLeft": -idxLogoFull[0]/2+"px"
	});
	
	$("#engines").mouseenter(function(){ indexOpen(); });
	$("#engines").mouseleave(function(){ indexClose(); });
}

var idxState = false,
	idxClear = undefined;
	
function indexOpen()
{
	idxState = true;
	clearTimeout(idxClear);
	
	$("#engines").css({
		"height": idxHeight
	});
	
	for (e in eng) 
	{
		var op = $("#"+e+"_logo").hasClass("active");
		$("#"+e+"_logo").stop().queue("fx",[]).animate({
			"marginLeft": eng[e].idxPos[0]+"px",
			"marginBottom": eng[e].idxPos[1]+"px",
			"opacity": (op) ? 1 : idxFadedOpacity,
			"width": idxLogoSmall[0],
			"height": idxLogoSmall[1],
		}, fadeDur);
	}	
}

function indexClose()
{
	idxState = false;
	
	$("#engines").css({
		"height": idxLogoFull[1]
	});
	
	$("#engines a").each(function()
	{
		var op = $(this).hasClass("active");
		$(this).stop().queue("fx",[]).animate({
			"marginLeft": -idxLogoFull[0]/2+"px",
			"marginBottom": 0,
			"opacity": (op) ? 1 : 0,
			"width": idxLogoFull[0],
			"height": idxLogoFull[1]
		}, fadeDur);
	});
	
	// Because jQuery doesn't like me
	idxClear = setTimeout(function(){ $("#engines a:not(.active)").css("opacity",0) }, fadeDur);
}



/*	GENERATING THE SEARCH ENGINE PAGE
	-----------------------------------------------------  */

function build(e, animate) 
{
	var methodFade = (animate) ? fadeDur : 0;

    buildcount = (buildcount + 1);
	
    if (buildcount > 1) {
	    setCookie("lastengine", e);
    }
    current.engine = e;		// Just the engine's ID for reference
	e = eng[e];				// Engine object
	
	$("#title").html(titlePrefix+e.pageTitle);
	
	$("#method").stop().queue("fx",[]).animate({"opacity": 0}, methodFade);
	
	op = (idxState) ? idxFadedOpacity : 0;
	$("#engines a").stop().queue("fx",[]).removeClass("active");
	$("#"+current.engine+"_logo").addClass("active").animate({"opacity": 1}, fadeDur);
	$("#engines a:not(.active)").animate({"opacity": op}, fadeDur);
	
	if (typeof e.languages == "object") setLang(firstProp(e.languages));
	else $("#lang").fadeOut(fadeDur);
	
	closeSugBox(false);
	
	$("#i").attr("autosave", "com.infinise.go."+current.engine);
	$("#input input").focus();
	
	setTimeout(function()
	{
		$("#method").html("");
		for (place in e.places) $("#method").append("<a onclick='setPlace(this)'>"+place+"</a>");
		
		setPlace("#method a:first");
		
		$("#method").animate({"opacity": 1}, fadeDur);
	}, methodFade);
}

function setPlace(place) 
{
	current.place = $(place).html();
	
	$("#method a").removeClass("active");
	$(place).addClass("active");
	$("#input input").focus();
	
	//If the current search has false or no URL (in the base.js file) for its first (starting counting from 0) index, then turn on autocomplete to show past searches.
	if (eng[current.engine].places[current.place][1] !== false)
	{
		fetchSuggestions();
		$("#i").attr("autocomplete", "off");
	} 
	else 
	{
		closeSugBox(false);
		$("#i").attr("autocomplete", "on");
	}
}

function setLang(language) 
{
	current.language = language;
	
	$("#lang").fadeIn(fadeDur).html(language);
	$("#input input").focus();
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
	
	if (e.which == 50 && isCtrl == true) 	{ /* Key "2" */ 	nextPlace(); return false; }
	if (e.which == 51 && isCtrl == true) 	{ /* Key "3" */ 	nextLanguage(); return false; }
	
	/*if (e.which == 37 && isCtrl == true)				{ Arrow Left	prevEngine(); }*/
	if (e.which == 39 && isCtrl == true)				{ /* Arrow Right */	nextEngine(); }
		
	if (e.which == 38) 						{ /* Arrow Up */ 	prevSugResult(); }	
	if (e.which == 40) 						{ /* Arrow Down */ 	nextSugResult(); }	
	if (e.which == 27) 						{ /* ESC */ 		closeSugBox(false); }	
	if (e.which == 13) 						{ /* Enter */ 		applySugResult(); }
});

/*function prevEngine() 
{
	build(findPrevious(eng, current.engine), true);
}*/

function nextEngine() 
{
	build(findNext(eng, current.engine), true);
}

function nextPlace() 
{
	var nextPlace = findNext(eng[current.engine].places, current.place);
	$("#method a").each(function()
	{
		if ($(this).html() == nextPlace) setPlace($(this));
	})
}

function nextLanguage() 
{
	setLang(findNext(eng[current.engine].languages, current.language));
}


/*	SUGGESTIONS
	-----------------------------------------------------  */

function fetchSuggestions(key) 
{
	if (key == undefined || (!inArray(key, new Array(13,16,20,27,37,38,39,40)) && !isCtrl && !isCmd)) 
	{
		if ( $("#i").val() != "" && eng[current.engine].places[current.place][1] !== false ) 
		{
			current.suggestionsTimestamp = new Date().getTime();
			
			var url = eng[current.engine].places[current.place][1];
				url = url.replace("%query%", encodeURIComponent($("#i").val()));
				url = url.replace("%time%", current.suggestionsTimestamp);
			if (typeof eng[current.engine].languages == "object") 
				url = url.replace("%lang%", eng[current.engine].languages[current.language]);
	
			$.getJSON(url, function(data) { buildSuggestions(data); })
		} 
		else closeSugBox(false);
	}
}

function buildSuggestions(list) 
{
	if (list.empty) 
	{
		if(console)console.log("(1) Suggestions for '"+list.query+"' empty.");
		closeSugBox(false);
	}
	else if (
		list.engine == current.engine && 
		list.timestamp == current.suggestionsTimestamp &&
		list.query == $("#i").val()
	) {
		if(console)console.log("(2) Suggestions for '"+list.query+"' accepted.");
		
		$("#sugs").html("");
		for (sug in list.results)
		{
			sug = list.results[sug];
			$("#sugs").append("<li><a href='"+sug[1]+"'>"+sug[0]+"</a></li>");
		}
		
		$("#sugs").css({"display": "block"});	
		$("#sugs li").mousemove(function() 
		{
			$("#sugs .active").removeClass("active");
			$(this).addClass("active");
		}
		).click(function() 
		{
			applySugResult();
		});
	} 
	else 
	{
		if(console)console.log("(3) Suggestions for '"+list.query+"' discarded.");
	}
}

function prevSugResult() 
{
	if ($("#sugs").css("display") == "none") return;
	if ($("#sugs .active").length == 0) {
		$("#sugs li:last-child").addClass("active");
	} else {
		$("#sugs .active").removeClass("active").prev().addClass("active");
	}
	backupQuery();
}

function nextSugResult() 
{
	if ($("#sugs").css("display") == "none") return;
	if ($("#sugs .active").length == 0) {
		$("#sugs li:first-child").addClass("active");
	} else {
		$("#sugs .active").removeClass("active").next().addClass("active");
	}
	backupQuery();
}

var originalQuery = false;

function backupQuery() 
{
	if ($("#sugs .active").length > 0) {
		if (!originalQuery) originalQuery = $("#i").val();
		$("#i").val($("#sugs .active a").html());
	} else {
		$("#i").val(originalQuery);
		originalQuery = false;
	}
}

function closeSugBox(src) 
{
	if (src == false || src == undefined || (src.id != "i" && src.id != "sugs"))
		$("#sugs").html("").css({"display": "none"});
}

function applySugResult() 
{
	if ($("#sugs .active").length > 0) {
		$("#i").val($("#sugs .active a").html());
		closeSugBox(false);
	}
}
