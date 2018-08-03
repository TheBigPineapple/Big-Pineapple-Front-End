function addHours (numHours) {
	startConfetti();
	setTimeout(() => {
		stopConfetti();
	}, 2000);

	// Update Cookies here
	processAddedHours(numHours);

	updateHabiticaBar();
}

function reformatUIForCalendar (googleUser) {
	document.getElementById('landing-content').style.display = 'none';
	document.getElementById('habitica-container').style.display = 'table';
	document.getElementById('calendar-container').style.display = 'table';

	let profile = googleUser.getBasicProfile();

	// Pass in the Habitica User object, not the hard coded info, obviously
	setUserInfo({
		profile: {
			imageUrl: profile.getImageUrl(),
			name: profile.getName()
		}
	});

	// Check for and set default cookie values
	var currentLvl = parseInt(getCookie('lvl'));
	var currentExp = parseInt(getCookie('exp'));
	var currentHours = parseInt(getCookie('hours'));
	var currentHp = parseInt(getCookie('hp'));

	if (!currentLvl)
		currentLvl = 1;
	if (!currentExp)
		currentExp = 0;
	if (!currentHours)
		currentHours = 0;
	if (!currentHp)
		currentHp = 100;

	updateCookies(currentLvl, currentExp, currentHours, currentHp);

	updateHabiticaBar();

	initCalendar();
}

function setUserInfo (userData) {
	document.getElementById('profile-picture-img').src = userData.profile.imageUrl;
	document.getElementById('username-field').innerHTML = userData.profile.name;
}

function updateHabiticaBar () {
    var currentLvl = parseInt(getCookie('lvl'));

    document.getElementById('hp-field').innerHTML = getCookie('hp');
    document.getElementById('exp-field').innerHTML = "" + getCookie('exp') + "/" + (EXP_TO_LEVEL_UP * currentLvl);
    document.getElementById('level-field').innerHTML = getCookie('lvl');
    document.getElementById('class-field').innerHTML = 'warrior';
    document.getElementById('hours-field').innerHTML = getCookie('hours');
}