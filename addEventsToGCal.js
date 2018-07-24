var clientId = 'YOUR_CLIENT_ID';
var apiKey = 'YOUR_API_KEY';
var scopes = 'https://www.googleapis.com/auth/calendar';

// coordinates for event search set to Columbia University by default
var latitude = 40.8075;
var longitude = -73.9626;

getLocation();
var charityEvents = getCharityEvents(latitude, longitude);
createNewCal(gapi);
addEventsToGCal(charityEvents, gapi);


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation failed.");
    }
}


function storePosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}


function getCharityEvents(latitude, longitude) {
    var headers = {"Authorization" : "Bearer" + config.eventbrite_personal_OAuth};
    var public_token = "JC4FQ5WJYL7ZSF2H5G2O";


    charity_category_id = "111";
    var params = {
        "location.latitude" : latitude,
        "location.longitude" : longitude,
        "categories" : charity_category_id
    };

    var events = []
    $.get(
        "https://www.eventbriteapi.com/v3/events/search/",
        params,
        function(data) {
            events = JSON.parse(data)['events'];
        }
    );
    return events;
}


function createNewCal(gapi) {
    var params = {'summary' : 'Big Pineapple Calendar'};
    var args = {'path' : 'https://www.googleapis.com/calendar/v3/calendars', 'method' : 'POST', 'params' : params}
    gapi.client.request(args);
}


function addEventsToGCal(events, gapi) {
    var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2015-05-28T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'end': {
            'dateTime': '2015-05-28T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'}
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
            ]
        }
    };


    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });

    request.execute(function(event) {
        appendPre('Event created: ' + event.htmlLink);
    });

}
