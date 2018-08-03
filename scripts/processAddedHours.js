function processAddedHours(addedHours) {
    var currentLvl = parseInt(getCookie('lvl'));
    var currentExp = parseInt(getCookie('exp'));
    var currentHours = parseInt(getCookie('hours'));
    var currentHp = parseInt(getCookie('hp'));
    // add the completed hours!
    currentHours += addedHours;

    // determine exp to level up
    var expToLevelUp = EXP_TO_LEVEL_UP * currentLvl;

    // add exp based on the hours completed!
    currentExp += EXP_PER_HOUR * addedHours;

    // level up!
    while (currentExp > expToLevelUp) {
        currentLvl++;
        currentHp += HP_PER_LEVEL;
        expToLevelUp = EXP_TO_LEVEL_UP * currentLvl;
    }

    updateCookies(currentLvl, currentExp, currentHours, currentHp);
}

function updateCookies(currentLvl, currentExp, currentHours, currentHp) {
    setCookie('lvl', currentLvl);
    setCookie('exp', currentExp);
    setCookie('hours', currentHours);
    setCookie('hp', currentHp);
}