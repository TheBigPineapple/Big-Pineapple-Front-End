let eventList = [];

async function displayUserCalendars() {
  try {
    const calendars = await getCalendars();
    await getEventsFromMultipleCalendars(calendars);
    await putEventsInFullCalendar();
  } catch(err){
    console.log("Error: " + err);
  }
}

async function userHasCharityCalendar() {
  const userCalendars = await getCalendars();
  for (let i = 0; i < userCalendars.length; i++) {
    if (userCalendars[i].summary.includes(charityCalendarName))
      return true;  
  }
  return false;
}

async function getCalendars() {
  return new Promise(function(resolve,reject){
    gapi.client.load('calendar', 'v3', function() {
      var request = gapi.client.calendar.calendarList.list();

      request.execute(function(resp) {
        var calendars = resp.items;
        resolve(calendars);
      });
    });
  });
}

async function getEventsFromMultipleCalendars(calendars) {
  return new Promise(function(resolve,reject){
    eventList = [];
    let promiseChain = [];
    for(let i = 0; i < calendars.length; i++){
      var calendar = calendars[i];
      if (calendar != null && !calendar.id.includes("#"))
        promiseChain.push(getCalendarEvents(calendar));
    }

    Promise.all(promiseChain)
      .then(function(nothing){
        resolve();
      });
  });
}

function getCalendarEvents(calendar) {
  return new Promise(function(resolve,reject){
    gapi.client.load('calendar', 'v3')
    .then(function() {
      var request = gapi.client.calendar.events.list({
        'calendarId': calendar.id
      });

      request.then(function(response) {
        formatEventsForFullCalendar(response.result.items);
        resolve();
      });
    });
  });
}

function formatEventsForFullCalendar(events) {
  for (var i = 0; i < events.length; i++) {
    event = events[i];
    if (event == null) continue;
      pushEventIntoList(event);
  }
}

function pushEventIntoList(event) {
  try {
    eventList.push({
      id: event.id,
      title: event.summary,
      start: event.start.dateTime || event.start.date,
      end: event.end.dateTime || event.end.date,
      url: event.htmlLink,
      location: event.location,
      description: event.description
    });
  }
  catch(err) {}
}

async function putEventsInFullCalendar() {
  return new Promise(function(resolve,reject){
    var successArgs = [ eventList ].concat(Array.prototype.slice.call(arguments, 1)); // forward other jq args
    var successRes = $.fullCalendar.applyAll(true, this, successArgs);
    fullCal = $('#calendar').fullCalendar();
    fullCal.fullCalendar('addEventSource', eventList);
    resolve();
  });
}