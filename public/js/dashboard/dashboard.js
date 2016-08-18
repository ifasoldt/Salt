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

  fetchApi('PATCH',`/api/users/${current_id}`, formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      location.reload()
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
  var data = new FormData()
  var pics = document.getElementById('images_files').files.length;
  for (var x = 0; x < pics; x++) {
    data.append('images_files[]', document.getElementById('images_files').files[x]);
  }
  data.append('title', document.getElementById('title').value)
  data.append('date', document.getElementById('date').value)
  data.append('time', document.getElementById('time').value)
  data.append('guest_limit', document.getElementById('guest_limit').value)
  data.append('unlimited_guests', document.getElementById('unlimited_guests').checked)
  data.append('alcohol_allowed', document.getElementById('alcohol_allowed').checked)
  data.append('allow_children', document.getElementById('allow_children').checked)
  data.append('filter_guests', document.getElementById('filter_guests').checked)
  data.append('food', document.getElementById('food').value)
  data.append('description', document.getElementById('description').value)


  // data.append('user', 'hubot')
  // var formFields = {
  //   title: document.getElementById('title').value,
  //   date: document.getElementById('date').value,
  //   time: document.getElementById('time').value,
  //   guest_limit: document.getElementById('guest_limit').value,
  //   unlimited_guests: document.getElementById('unlimited_guests').checked,
  //   allow_children: document.getElementById('allow_children').checked,
  //   alcohol_allowed: document.getElementById('alcohol_allowed').checked,
  //   filter_guests: document.getElementById('filter_guests').checked,
  //   food: document.getElementById('food').value,
  //   description: document.getElementById('description').value
  // }
  fetchApiImages('POST', '/api/events', data, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      console.log(response)
      // redirect(`/events/${response.id}`)
    }
    else {
      console.log(response)
      var errors = response.forEach(function(error){
        createError(error, 'event_description')
      })
    }
  })
})
