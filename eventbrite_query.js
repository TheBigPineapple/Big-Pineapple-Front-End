
// coordinates for event search set to Columbia University by default
var latitude = 40.8075;
var longitude = -73.9626;

getLocation();
var charityEvents = getCharityEvents(latitude, longitude);
addEventsToGCal(charityEvents, /* Goog Auth stuff */);



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


function getCharityEvents(latitude, longitude)
{
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

function addEventsToGCal(events, /* whatever is needed for GCal user auth*/)
{
    // TODO: this function :)
}