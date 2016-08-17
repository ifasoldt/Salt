// update profile
document.getElementById('btn_submit_profile').addEventListener('click', function () {
  var formFields = {
    first_name: document.getElementById('first_name_profile').value,
    last_name: document.getElementById('last_name_profile').value,
    email: document.getElementById('email_profile').value,
    date_of_birth: document.getElementById('date_of_birth_profile').value,
    phone: document.getElementById('phone_profile').value,
    address: document.getElementById('address_profile').value,
    city: document.getElementById('city_profile').value,
    state: document.getElementById('state_profile').value,
    zip: document.getElementById('zip_profile').value
  }

  fetchApi('PATCH','/api/users', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      redirect('/current_user/dashboard')
    }
    else {
      var errors = response.forEach(function(error){
        var div = document.createElement("div")
        div.style.color = 'red'
        div.innerHTML = error
        document.getElementById('zip_profile').parentElement.appendChild(div)
      })
    }
  })
})
// create event
document.getElementById('btn_event_submit').addEventListener('click', function () {
  var formFields = {
    title: document.getElementById('event_title').value,
    date: document.getElementById('event_date').value,
    time: document.getElementById('event_time').value,
    guests: document.getElementById('event_number_guests').value,
    unlimited_guests: document.getElementById('event_unlimited').value,
    children: document.getElementById('event_children').value,
    alcohol: document.getElementById('event_alcohol').value,
    food: document.getElementById('event_food').value,
    description: document.getElementById('event_description').value
  }
  fetchApi('POST', '/api/events', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      location.reload()
    }
    else {
      var errors = response.forEach(function(error){
        var div = document.createElement("div")
        div.style.color = 'red'
        div.innerHTML = error
        document.getElementById('event_description').parentElement.appendChild(div)
      })
    }
  })
})
