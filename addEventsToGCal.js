function handleAddingEvents(gapi) {
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
}

// uses the browser geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation failed.");
    }
}

// sets the global vars latitude and longitude to the right values
function storePosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

// call the eventbrite API with the users location to return charity events
function getCharityEvents(latitude, longitude) {
    var headers = {"Authorization" : "Bearer" + config.eventbrite_personal_OAuth};
    var public_token = "JC4FQ5WJYL7ZSF2H5G2O";


    var charity_category_id = "111";
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

// creates a new calendar titled 'Big Pineapple Calendar' on the user's account
function createNewCal(gapi) {
    var params = {'summary' : 'Big Pineapple Calendar'};
    var args = {'path' : 'https://www.googleapis.com/calendar/v3/calendars', 'method' : 'POST', 'params' : params}
    gapi.client.request(args);
}

// takes a list of events and adds them all as GCal events on the Big Pineapple Calendar!
function addEventsToGCal(events, gapi) {
    for (var i = 0; i < events.length; i++) {
        var event = events[0];

        var calEntry = {
            'summary': event["name"]["text"],
            'description': event["url"] + " \n " + event["description"]["text"],
            'start': {
                'dateTime': event["start"]["utc"],
                'timeZone': event["start"]["timezone"]
            },
            'end': {
                'dateTime': event["end"]["utc"],
                'timeZone': event["end"]["timezone"]
            },
            'reminders': {
                'useDefault': true,
            }
        };
    }

    // TODO: insert into the correct calendar (aka the one titled Big Pineapple Calendar)
    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': calEntry
    });

    request.execute(function(calEntry) {
        appendPre('Event created: ' + calEntry.htmlLink);
    });
}
