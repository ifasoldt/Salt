$(document).ready(function(){
  $("#dateHeader").flatpickr()
  $("#timeHeader").flatpickr()
})

$(document).ready(function () {
  $('#navDropdown').click(function () {
    var isActive = $(this).next("div").hasClass('active')
    $(".menu").each(function(){
      $(this).slideUp(150)
      $(this).removeClass('active')
    })
    if(! isActive ){
      $(this).next("div").slideToggle(150)
      $(this).next("div").addClass('active')
      $(this).siblings().next("div ul").hide(150)
    }
  })
})

// sign up
document.getElementById('btn_sign_up').addEventListener('click', function () {
  removeErrors()
  var buttonDisable = document.getElementById('btn_sign_up')
  buttonDisable.setAttribute('disabled', true)
  var formFields = {
    first_name: document.getElementById('sign_up_firstname').value,
    last_name: document.getElementById('sign_up_lastname').value,
    email: document.getElementById('sign_up_email').value,
    password: document.getElementById('sign_up_password').value,
    password_confirmation: document.getElementById('sign_up_password_confirm').value,
    date_of_birth: document.getElementById('sign_up_birth').value
  }

  fetchApi('POST','/api/users', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      redirect('/current_user/dashboard')
      buttonDisable.removeAttribute('disabled')
    }
    else {
      buttonDisable.removeAttribute('disabled')
      var responseErrors = response.forEach(function(error){
        createError(error, 'sign_up_password_confirm')
      })
    }
  })
})
// login
document.getElementById('btn_login').addEventListener('click', function () {
  removeErrors()
  var buttonDisable = document.getElementById('btn_login')
  buttonDisable.setAttribute('disabled', true)
  var formFields = {
    email: document.getElementById('login_email').value,
    password: document.getElementById('login_password').value
  }
  fetchApi('POST', '/api/sign_in', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      location.reload()
      buttonDisable.removeAttribute('disabled')
    }
    else {
      buttonDisable.removeAttribute('disabled')
      createError(response.error, 'login_password')
    }
  })
})

document.getElementById('btn_event_submitHeader').addEventListener('click', function () {
  removeErrors()
  var buttonDisable = document.getElementById('btn_event_submitHeader')
  buttonDisable.setAttribute('disabled', true)
  var data = new FormData()
  var pics = document.getElementById('images_filesHeader').files.length;
  for (var x = 0; x < pics; x++) {
    data.append('images_files[]', document.getElementById('images_files').files[x]);
  }
  data.append('title', document.getElementById('titleHeader').value)
  data.append('date', document.getElementById('dateHeader').value)
  data.append('time', document.getElementById('timeHeader').value)
  data.append('user_address', document.getElementById('user_addressHeader').checked)
  data.append('street', document.getElementById('streetEventHeader').value)
  data.append('city', document.getElementById('cityEventHeader').value)
  data.append('state', document.getElementById('stateEventHeader').value)
  data.append('zip', document.getElementById('zipEventHeader').value)
  data.append('guest_limit', document.getElementById('guest_limitHeader').value)
  data.append('unlimited_guests', document.getElementById('unlimited_guestsHeader').checked)
  data.append('alcohol_allowed', document.getElementById('alcohol_allowedHeader').checked)
  data.append('allow_children', document.getElementById('allow_childrenHeader').checked)
  data.append('filter_guests', document.getElementById('filter_guestsHeader').checked)
  data.append('food', document.getElementById('foodHeader').value)
  data.append('description', document.getElementById('descriptionHeader').value)

  fetchApiImages('POST', '/api/events', data, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      redirect(`/events/${response.id}`)
      buttonDisable.removeAttribute('disabled')
    }
    else {
      buttonDisable.removeAttribute('disabled')
      var errors = response.forEach(function(error){
        createError(error, 'zipEventHeader')
      })
    }
  })
})
