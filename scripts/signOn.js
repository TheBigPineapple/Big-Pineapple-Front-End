let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
let SCOPES = "https://www.googleapis.com/auth/calendar";
var charityCalendarName = "Big Pineapple Calendar";
var fullCalendar;

async function onSignIn(googleUser) {
	console.log("Starting...");
	initGoogleApi();
	reformatUIForCalendar();
	if (! await userHasCharityCalendar())
		await addCharityCalendarToUserCalendar();
	await displayUserCalendars();
	console.log("Finished displaying user calendars");
}

function reformatUIForCalendar () {
	document.getElementById('landing-content').style.display = 'none';
	document.getElementById('habitica-container').style.display = 'table';
	document.getElementById('calendar-container').style.display = 'table';

	// Pass in the Habitica User object, not the hard coded info, obviously
	populateHabiticaBar({
		profile: {
			imageUrl: 'https://avatars1.githubusercontent.com/u/20672636?s=460&v=4',
			name: "Samuel"
		},
		stats: {
			hp: '56/100',
			exp: '1234/5000',
			lvl: 12,
			class: 'warrior'
		}
	});

	initCalendar();
}

function populateHabiticaBar (userData) {
	/*
		userData.profile.imageUrl
		userData.profile.name
		userData.stats.hp
		userData.stats.exp
		userData.stats.lvl
		userData.stats.class
		userData.party
	*/

	document.getElementById('profile-picture-img').src = userData.profile.imageUrl;
	document.getElementById('username-field').innerHTML = userData.profile.name;
	document.getElementById('hp-field').innerHTML = userData.stats.hp;
	document.getElementById('exp-field').innerHTML = userData.stats.exp;
	document.getElementById('level-field').innerHTML = userData.stats.lvl;
	document.getElementById('class-field').innerHTML = userData.stats.class;
}

/**
*  Sign out the user upon button click.
*/
// function handleSignoutClick(event) {
// 	gapi.auth2.getAuthInstance().signOut();
// }

async function initGoogleApi() {
	setClientId();
	await setApiKey();
	gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false});
}

function setClientId() {
	CLIENT_ID = google_client_secret.web.client_id;
	var $meta = $('meta[name=google-signin-client_id]').attr('content', CLIENT_ID);
}

function getClientID() {
	return CLIENT_ID;
}

async function setApiKey() {
	return new Promise(function(resolve,reject){
		//This below takes time, but has no async call back.
		API_KEY = google_client_secret.web.api_key;
		//Below is a fake async wait to let things catch up
		setTimeout(function() {
			gapi.client.setApiKey(API_KEY);
			resolve();
		}, 500);
	});
}

function initCalendar() {
  	fullCalendar = $('#calendar').fullCalendar({
	// googleCalendarApiKey: 'AIzaSyAkA8yypJIM-rZe--f4P0uyR7wE91liuCY',
	// textColor: 'white',
	eventClick: function(calEvent, jsEvent, view) {
	    $(this).css('border-color', 'red', 'border-width', 'thick');
	    setSelectedEvent(event);
  	},
	customButtons: {
		logEventHours: {
			text: 'Log Hours From Event',
			click: function() {
				logEventHours();
			}
		}
	},
	header: {
		left: 'prev,next today logEventHours',
		center: 'title',
		right: 'month,agendaWeek,agendaDay'
	}
  });
}

function getApiKey() {
	return API_KEY;
}

function getScopes() {
	return SCOPES;
}