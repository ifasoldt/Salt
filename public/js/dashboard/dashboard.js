//get current user id
var profile = document.getElementById('current_profile')
var current_id = profile.getAttribute('data-id')
// update profile
document.getElementById('btn_submit_profile').addEventListener('click', function () {
  removeErrors()
  var formFields = {
    first_name: document.getElementById('first_name_profile').value,
    last_name: document.getElementById('last_name_profile').value,
    email: document.getElementById('email_profile').value,
    date_of_birth: document.getElementById('date_of_birth_profile').value,
    phone: document.getElementById('phone_profile').value,
    street: document.getElementById('street_profile').value,
    city: document.getElementById('city_profile').value,
    state: document.getElementById('state_profile').value,
    zip: document.getElementById('zip_profile').value
  }

  fetchApi('PATCH','/api/users/' + current_id, formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      redirect('/current_user/dashboard')
    }
    else {
      var errors = response.forEach(function(error){
        createError(error, 'zip_profile')
      })
    }
  })
})
// create event
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
  fetchApi('POST', '/api/events', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      location.reload()
    }
    else {
      var errors = response.forEach(function(error){
        createError(error, 'event_description')
      })
    }
  })
})
