function updateDecayExp() {
    var currentDate = new Date();
    setCookie('lastActive', currentDate);
}

function decayExpBool() {
    var lastActive = getCookie('lastActive');
    var currentDate = new Date();
    if( lastActive === "" )
        return false;
    // set to decay after 20 days of inactivity
    else if( Math.floor((currentDate - lastActive) / (1000*60*60*24)) > 20 )
        return false;
    return true;
}