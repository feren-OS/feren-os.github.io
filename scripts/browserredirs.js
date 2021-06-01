function browserRedirs() {
    if (window.document.documentMode) { /*I.E.*/
        window.location = "https://feren-os.github.io/goodbye-browser/ie";
        return true
    }
    return false
}