function loadSP() {    
    // Start clock
    startTime();
    
    // Load settings
    setBG();
    
    document.body.classList.add("shownscrollbar");
}


/*  CUSTOM BG SUPPORT
    -----------------------------------------------------  */
function setBG() {
    var bgurl = "https://source.unsplash.com/collection/19065423";
    document.getElementById("bgparallax").style.backgroundImage = ("linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url("+bgurl+")");
}

/*	TIME
	-----------------------------------------------------  */

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    // add a zero in front of numbers less than 10
    m=checkTime(m);
    
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
    
    t=setTimeout('startTime()',3000);
}

function checkTime(i) {
    if (i<10) {
        i="0" + i;
    }
    return i;
}