let latitude;
let longitude;
let charityCalendarId;
let oAuthEventBriteToken;

async function addCharityCalendarToUserCalendar() {
    getLocation();
    await getEventBriteOAuth();
    const charityEvents = await getCharityEvents();
    await createNewCalendar();
    return await addMultipleEventsToGCal(charityEvents);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(storePosition, showGetLocationError);
    } else {
        alert("Geolocation failed.");
        console.log("Geolocation failed.");
        // coordinates for event search set to Columbia University on fail
        latitude = 40.8075;
        longitude = -73.9626;
    }
}

function storePosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

function showGetLocationError(error) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    // coordinates for event search set to Columbia University on fail
    latitude = 40.8075;
    longitude = -73.9626;
}

async function getEventBriteOAuth() {
    return new Promise(function(resolve,reject){
        //This below takes time, but has no async call back.
        oAuthEventBriteToken = eventbrite_client_secret.oAuth_Token;
        //Below is a fake async wait to let things catch up
        setTimeout(function() {
            resolve();
        }, 500);
    });
}

async function getCharityEvents() {
    return new Promise(function(resolve,reject){
        var events = []
        $.get(
            "https://www.eventbriteapi.com/v3/events/search/?token=" + oAuthEventBriteToken,
            getEventBriteParams(),
            function(response) {
                events = response.events;
                resolve(events);
            }
        );
    });
}

function getEventBriteParams() {
    return params = {
        "location.latitude" : latitude,
        "location.longitude" : longitude,
        "categories" : 111
    };
}

async function createNewCalendar() {
    return new Promise(function(resolve,reject){
        gapi.client.load('calendar', 'v3')
        .then(function() {
          var request = gapi.client.calendar.calendars.insert({
            'summary': charityCalendarName
          });
          request.then(function(response) {
            charityCalendarId  = response.result.id;
            console.log("Created charity calendar");
            resolve();
          });
        });
    });
}


async function addMultipleEventsToGCal(events) {
  return new Promise(function(resolve,reject){
    let promiseChain = [];
    for(let i = 0; i < events.length; i++){
        let event = events[i];
        promiseChain.push(addEventBriteEventToGCal(event));
    }

    Promise.all(promiseChain)
      .then(function(nothing){
        console.log("Added events to charity calendar");
        resolve();
      });
  });
}

async function addEventBriteEventToGCal(oneEventBriteEvent) {
    return new Promise(function(resolve,reject){
        var gCalEvent = formatEventForGCal(oneEventBriteEvent);
        var request = gapi.client.calendar.events.insert({
            'calendarId': charityCalendarId,
            'resource': gCalEvent
        });
        request.execute(function(gCalEntry) {
            resolve();
        });
    });
}

function formatEventForGCal(event) {
    var gCalEvent = {
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
    return gCalEvent;
}