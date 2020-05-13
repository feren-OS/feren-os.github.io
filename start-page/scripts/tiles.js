function initTiles() {
  var i; 
    for (i=1; i < 9; i++) {
				
				var urlBg =  "http://placeholderimagegenerator.000webhostapp.com/440x360/000000/fff&text=" + getCookie('tile' + i + 'settings');
				var urlAlt = "Go to " + getCookie('tile' + i + 'settings');
				// Add custom logos for certain sites here
			  if (getCookie('tile' + i + 'settings').indexOf('ferenos.weebly.com')  != -1) {
					urlBg = "resources/sd_feren-os.png";
					urlAlt = "Go to Feren OS Website";
				}
				if (getCookie('tile' + i + 'settings').indexOf('vivaldi.net')  != -1) {
					urlBg = "resources/sd_vivaldi_community.gif";
					urlAlt = "Go to Vivaldi Browser's Community";
				}
				if (getCookie('tile' + i + 'settings').indexOf('ferenos.weebly.com/discord')  != -1) {
					urlBg = "resources/sd_discord.png";
					urlAlt = "Join the Feren OS Discord";
				}
				if (getCookie('tile' + i + 'settings').indexOf('omgubuntu.co.uk') != -1) {
					urlBg = "resources/sd_omgubuntu.png";
					urlAlt = "Go to OMG! Ubuntu for news about Feren OS's base, and cool tips and tricks that (most of the time) work with Feren OS.";
				}
				if (getCookie('tile' + i + 'settings').indexOf('facebook.com')  != -1) {
					urlBg = "resources/sd_facebook.png";
					urlAlt = "Go to Facebook";
				}
				if (getCookie('tile' + i + 'settings').indexOf('twitter.com')  != -1) {
					urlBg = "resources/sd_twitter.png";
					urlAlt = "Go to Twitter";
        }
        // Make sure that top-level is in front of any subdomain
        if (getCookie('tile' + i + 'settings').indexOf( 'twitter.com/Feren_OS')  != -1) {
					urlBg = "resources/sd_feren_twitter.png";
					urlAlt = "Go to the Feren OS Twitter Community";
				}
				if (getCookie('tile' + i + 'settings').indexOf('chrome.google.com/webstore')  != -1) {
					urlBg = "resources/sd_chrome_extensions.png";
					urlAlt = "Go to Vivaldi's Extensions Page";
				}

				document.getElementById('cell' + i + 'image').src = urlBg;
        document.getElementById('cell' + i + 'image').alt = urlAlt;

        if (Boolean(location.href.search('settings') == -1) == true) {
          document.getElementById('cell' + i + 'link').href = getCookie('tile' + i + 'settings');
        }
		}
}