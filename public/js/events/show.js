var eventID = document.getElementById('current_event')
var current_event = eventID.getAttribute('data-id')
// edit event
document.getElementById('btn_event_submit').addEventListener('click', function () {
  removeErrors()
  var formFields = {
    title: document.getElementById('event_title').value,
    date: document.getElementById('event_date').value,
    time: document.getElementById('event_time').value,
    guest_limit: document.getElementById('event_number_guests').value,
    unlimited_guests: document.getElementById('event_unlimited').checked,
    allow_children: document.getElementById('event_children').checked,
    alcohol_allowed: document.getElementById('event_alcohol').checked,
    food: document.getElementById('event_food').value,
    description: document.getElementById('event_description').value
  }
  fetchApi('PATCH', `/api/events/${current_event}`, formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      console.log(response)
      location.reload()
    }
    else {
      var errors = response.forEach(function(error){
        createError(error, 'event_description')
      })
    }
  })
})
