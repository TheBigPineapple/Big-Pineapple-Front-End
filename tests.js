function getCharityEvents(latitude, longitude) {
    // var headers = {"Authorization" : "Bearer" + config.eventbrite_personal_OAuth};
    var public_token = "JC4FQ5WJYL7ZSF2H5G2O";


    charity_category_id = "111";
    var params = {
        "token" : public_token,
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


var latitude = -9999999;
var longitude = -9999999;

console.log(latitude);
getLocation();
console.log(latitude);
