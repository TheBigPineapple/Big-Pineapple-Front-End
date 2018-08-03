function addHours (numHours) {
	startConfetti();
	setTimeout(() => {
		stopConfetti();
	}, 2000);

	// Update Cookies here

	updateHabiticaBar();
}

function reformatUIForCalendar (googleUser) {
	document.getElementById('landing-content').style.display = 'none';
	document.getElementById('habitica-container').style.display = 'table';
	document.getElementById('calendar-container').style.display = 'table';

	let profile = googleUser.getBasicProfile();
	console.log(profile);

	// Pass in the Habitica User object, not the hard coded info, obviously
	setUserInfo({
		profile: {
			imageUrl: profile.getImageUrl(),
			name: profile.getName()
		}
	});
	updateHabiticaBar();

	previewCalendar();
}

function setUserInfo (userData) {
	document.getElementById('profile-picture-img').src = userData.profile.imageUrl;
	document.getElementById('username-field').innerHTML = userData.profile.name;
}

function updateHabiticaBar () {
	document.getElementById('hp-field').innerHTML = getCookie('health');
	document.getElementById('exp-field').innerHTML = getCookie('exp');
	document.getElementById('level-field').innerHTML = getCookie('lvl');
	document.getElementById('class-field').innerHTML = 'warrior';
	document.getElementById('hours-field').innerHTML = getCookie('hours');
}