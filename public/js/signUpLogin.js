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
