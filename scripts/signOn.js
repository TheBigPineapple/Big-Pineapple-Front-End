let profile;
let CLIENT_ID;
let API_KEY;
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
let SCOPES = "https://www.googleapis.com/auth/calendar";
var charityCalendarName = "Big Pineapple Calendar";
var fullCalendar;

// Might have to promise chain this with register habitica
async function onSignIn(googleUser) {
	console.log("Starting...");
	initGoogleApi();
	previewCalendar();
	if (! await userHasCharityCalendar())
		await addCharityCalendarToUserCalendar();
	await displayUserCalendars();
	console.log("Finished displaying user calendars");
}

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

function previewCalendar() {
  // var successArgs = [ eventList ].concat(Array.prototype.slice.call(arguments, 1)); // forward other jq args
  // var successRes = $.fullCalendar.applyAll(true, this, successArgs);
  fullCalendar = $('#calendar').fullCalendar({
      googleCalendarApiKey: 'AIzaSyAkA8yypJIM-rZe--f4P0uyR7wE91liuCY',
  });
}

function getApiKey() {
	return API_KEY;
}

function getScopes() {
	return SCOPES;
}