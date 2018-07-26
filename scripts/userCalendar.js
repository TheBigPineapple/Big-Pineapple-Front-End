function displayUserCalendars() {
  console.log("Getting calendar ids...");
  startDisplayCalendarChain();
}

function startDisplayCalendarChain() {
	gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.calendarList.list();
    request.execute(function(resp) {
      console.log(resp);
      var userCalendars = resp.items;
      makeHTMLCalendar(userCalendars)
    });
  });
}

function makeHTMLCalendar(userCalendars) {
  console.log("calendars: " + userCalendars);
  var startOfCalendarIFrame = '<iframe src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;';
  var endOfCalendarIFrame = 'ctz=America%2FNew_York" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>';
  var iframeCalendar = startOfCalendarIFrame;

  for (var i = 0; i < userCalendars.length; i++) {
    calendarId = userCalendars[i].id;
    if (!calendarId.includes("#")) {
      iframeCalendar += "src=" + userCalendars[i].id + "&amp;color=%23691426&amp;";
    }
  }
  iframeCalendar += endOfCalendarIFrame;
  console.log("Calendar iframe: " + iframeCalendar);
  displayHTMLCalendar(iframeCalendar);
}

function displayHTMLCalendar(iframeCalendar) {
  document.getElementById("landing-content").innerHTML+= iframeCalendar;
    // document.getElementById('events').appendChild(iframeCalendar);
}