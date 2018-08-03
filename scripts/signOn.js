let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
let SCOPES = "https://www.googleapis.com/auth/calendar";
var charityCalendarName = "Big Pineapple Calendar";
var fullCalendar;

async function onSignIn (googleUser) {
	console.log("Starting...");
	initGoogleApi();
	reformatUIForCalendar(googleUser);
	if (! await userHasCharityCalendar())
		await addCharityCalendarToUserCalendar();
	await displayUserCalendars();
	console.log("Finished displaying user calendars");
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
	eventClick: function(calEvent, jsEvent, view) {
	    $(this).css('border-color', 'red');
	    setSelectedEvent(calEvent);
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