/* var apiUrl = "https://go.infinise.com/api/2.5/"; */
var apiUrl = "";


/*	DUCKDUCKGO	
	----------------------------------------------------- */

eng.duckduckgo = {
	pageTitle: "DuckDuckGo",
	logo: "duckduckgo.png",
	places: {
		'Search DuckDuckGo' : ["https://www.ddg.co/?q=%query%", true]
	}
};


/*	GOOGLE
	----------------------------------------------------- */

eng.google = {
	pageTitle: "Google",
	logo: "google.png",
	places: {
		'Web'    : ["http://www.google.com/search?q=%query%&hl=en",		apiUrl+"?eng=google&timestamp=%time%&q=%query%"],
		'Images' : ["http://images.google.com/images?q=%query%&hl=en",	apiUrl+"?eng=google&timestamp=%time%&q=%query%"],
		'Maps'   : ["http://maps.google.com/maps?q=%query%",			false]
	}
};


/*	ECOSIA
	----------------------------------------------------- */

eng.twitter = {
	pageTitle: "Ecosia",
	logo: "ecosia.png",
	places: {
		'Search Ecosia' : ["https://www.ecosia.org/search?q=%query%", false]
	}
};


/*	START PAGE
	----------------------------------------------------- */

eng.startpage = {
	pageTitle: "StartPage",
	logo: "startpage.png",
	places: {
		'Web'    : ["https://www.startpage.com/do/search?q=%query%&hl=en",		apiUrl+"?eng=google&timestamp=%time%&q=%query%"]
	}
};


/*	YOUTUBE
	----------------------------------------------------- */

eng.youtube = {
	pageTitle: "YouTube",
	logo: "youtube.png",
	places: {
		'Videos' : ["http://www.youtube.com/results?search_query=%query%", apiUrl+"?eng=youtube&timestamp=%time%&q=%query%"]
	}
};
