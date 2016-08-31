//get current user id
var profile = document.getElementById('current_profile')
var current_id = profile.getAttribute('data-id')
// update profile
document.getElementById('btn_submit_profile').addEventListener('click', function () {
  removeErrors()
  var buttonDisable = document.getElementById('btn_submit_profile')
  buttonDisable.setAttribute('disabled', true)
  var data = new FormData()
  var pics = document.getElementById('images_files_profile').files.length;
  for (var x = 0; x < pics; x++) {
    data.append('images_files[]', document.getElementById('images_files_profile').files[x]);
  }
  data.append('first_name', document.getElementById('first_name').value)
  data.append('last_name', document.getElementById('last_name').value)
  data.append('email', document.getElementById('email').value)
  data.append('date_of_birth', document.getElementById('date_of_birth').value)
  data.append('phone', document.getElementById('phone').value)
  data.append('description', document.getElementById('descriptionBio').value)
  data.append('street', document.getElementById('street').value)
  data.append('city', document.getElementById('city').value)
  data.append('state', document.getElementById('state').value)
  data.append('zip', document.getElementById('zip').value)

  fetchApiImages('PATCH',`/api/users/${current_id}`, data, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      buttonDisable.removeAttribute('disabled')
      location.reload()
    }
    else {
      buttonDisable.removeAttribute('disabled')
      var errors = response.forEach(function(error){
        createError(error, 'zip')
      })
    }
  })
})
// create event
document.getElementById('btn_event_submit').addEventListener('click', function () {
  removeErrors()
  var buttonDisable = document.getElementById('btn_event_submit')
  buttonDisable.setAttribute('disabled', true)
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
  data.append('filter_guests', document.getElementById('filter_guests').checked)
  data.append('food', document.getElementById('food').value)
  data.append('description', document.getElementById('description').value)

  fetchApiImages('POST', '/api/events', data, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      redirect(`/events/${response.id}`)
      buttonDisable.removeAttribute('disabled')
    }
    else {
      buttonDisable.removeAttribute('disabled')
      var errors = response.forEach(function(error){
        createError(error, 'zipEvent')
      })
    }
  })
})
