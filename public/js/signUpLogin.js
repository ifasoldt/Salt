// sign up
document.getElementById('btn_sign_up').addEventListener('click', function () {
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
      alert('success')
    }
    else {
      alert(response)
      location.reload()
    }
  })
})
// login
document.getElementById('btn_login').addEventListener('click', function () {
  var formFields = {
    email: document.getElementById('login_email').value,
    password: document.getElementById('login_password').value
  }
  fetchApi('POST', '/api/sign_in', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      alert('success')
    }
    else {
      alert(response)
    }
  })
})
