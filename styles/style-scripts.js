function browserOptimisations() {
    if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(UA) && /Firefox\/(\S+)/.test(UA)) { /*Firefox*/
        //Use Basic theme since the browser doesn't support blur
        //TODO: Find out UAs of other non-Firefox browsers that also do not support blur effects
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = '/styles/basic.css';
        link.media = 'all';
        head.appendChild(link);
    }
}
