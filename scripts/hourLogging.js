let currentEvent;
let confirmedEventHoursLength;

function setSelectedEvent(event) {
  currentEvent = event;
}

function logEventHours() {
  confirmedEventHoursLength = getEventLength(currentEvent);
  var result = $("#myModal").modal();
  console.log(result);
}

function getEventLength(event) {
  var hours = moment.duration(event.end - event.start).hours();
  if (hours < 1) return 1; 
  return hours;
}

function confirmLoggedHours() {
  addHours(confirmedEventHoursLength);
}