var eventID = document.getElementById('current_event')
var current_event = eventID.getAttribute('data-id')

// edit event
document.getElementById('btn_event_submit').addEventListener('click', function () {
  removeErrors()
  var data = new FormData()
  var pics = document.getElementById('images_files').files.length;
  for (var x = 0; x < pics; x++) {
    data.append('images_files[]', document.getElementById('images_files').files[x]);
  }
  data.append('title', document.getElementById('title').value)
  data.append('date', document.getElementById('date').value)
  data.append('time', document.getElementById('time').value)
  data.append('user_address', document.getElementById('user_address').checked)
  data.append('street', document.getElementById('streetEvent').value)
  data.append('city', document.getElementById('cityEvent').value)
  data.append('state', document.getElementById('stateEvent').value)
  data.append('zip', document.getElementById('zipEvent').value)
  data.append('guest_limit', document.getElementById('guest_limit').value)
  data.append('unlimited_guests', document.getElementById('unlimited_guests').checked)
  data.append('alcohol_allowed', document.getElementById('alcohol_allowed').checked)
  data.append('allow_children', document.getElementById('allow_children').checked)
  data.append('food', document.getElementById('food').value)
  data.append('description', document.getElementById('description').value)

  fetchApiImages('PATCH', `/api/events/${current_event}`, data, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      console.log(response)
      location.reload()
    }
    else {
      console.log(response)
      var errors = response.forEach(function(error){
        createError(error, 'zipEvent')
      })
    }
  })
})
var eventID_join = document.getElementById('current_event_join')
var current_event_join = eventID_join.getAttribute('data-id')
// edit event
document.getElementById('btn_application_submit').addEventListener('click', function () {
  removeErrors()
  var formFields = {
    quantity: document.getElementById('application_guests').value,
    message: document.getElementById('application_message').value
  }
  fetchApi('POST', `/api/events/${current_event_join}/applications`, formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      console.log(response)
      location.reload()
    }
    else {
      console.log(response)
      var errors = response.forEach(function(error){
        createError(error, 'application_message')
      })
    }
  })
})
