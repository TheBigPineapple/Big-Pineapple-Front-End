function updateDecayExp() {
    var currentDate = new Date();
    // creates date as string to easily reconstruct as date
    var dateStr = '' + currentDate.getFullYear() + '-' + currentDate.getMonth() + '-' + currentDate.getDate();
    setCookie('lastActive', dateStr);
}

function decayExpBool() {
    const HP_SCALING = 10;

    var lastActiveString = getCookie('lastActive');
    if( lastActiveString === "" )
        return false;
    
    var currentDate = new Date();
    // Creates date from string stored in cookie
    var parts =lastActiveString.split('-');
    // JavaScript counts months from 0:
    var lastActive = new Date(parts[0], parts[1] - 1, parts[2]); 

    // set to decay after a base of 20 days of inactivity + scales with user HP
    var hpRet = getCookie('hp');
    var hp = (hpRet === "" ? 0 : Number(hpRet));
    var decayLength = 20 + hp/HP_SCALING;

    if( Math.floor((currentDate - lastActive) / (1000*60*60*24)) < decayLength )
        return false;
    return true;
}