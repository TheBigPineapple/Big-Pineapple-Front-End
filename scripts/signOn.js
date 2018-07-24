let profile;
let CLIENT_ID;
let API_KEY;
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

//Called when index.html loads
function initGoogleApi() {
	console.log("Starting javascript...");
	setClientId();
	setApiKey();
	gapi.client.setApiKey(API_KEY);
	window.setTimeout(checkAuth,1);
	checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  if (authResult) {
    // exampleGoogleApiCall();
  }
}

// Might have to promise chain this with register habitica
function onSignIn(googleUser) {
	 gapi.auth.authorize(
     	{client_id: CLIENT_ID, scope: SCOPES, immediate: false}, handleAuthResult);
	profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	// exampleGoogleApiCall();
}

/**
*  Sign out the user upon button click.
*/
// function handleSignoutClick(event) {
// 	gapi.auth2.getAuthInstance().signOut();
// }

function appendPre(message) {
	var pre = document.getElementById('display-for-debugging');
	var textContent = document.createTextNode(message + '\n');
	pre.appendChild(textContent);
}

/** This shows a working api call to google **/
function exampleGoogleApiCall() {
	console.log("Listing events....");
	gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary'
    });
          
    request.execute(function(resp) {
      for (var i = 0; i < resp.items.length; i++) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(resp.items[i].summary));
        document.getElementById('events').appendChild(li);
      }
    });
  });
}


function setClientId() {
	CLIENT_ID = client_secret.web.client_id;
	var $meta = $('meta[name=google-signin-client_id]').attr('content', CLIENT_ID);
}

function getClientID() {
	return CLIENT_ID;
}

function setApiKey() {
	API_KEY = client_secret.web.api_key;
}

function getApiKey() {
	return api_key;
}