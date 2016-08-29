document.getElementById('submitPassword').addEventListener('click', function () {
  removeErrors()
  var buttonDisable = document.getElementById('submitPassword')
  buttonDisable.setAttribute('disabled', true)

  var formFields = {
    current_password: document.getElementById('currentPassword').value,
    password: document.getElementById('newPassword').value,
    password_confirmation: document.getElementById('confirmPassword').value
  }

  fetchApi('POST','/users/change/password', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      redirect('/current_user/dashboard')
      buttonDisable.removeAttribute('disabled')
    }
    else {
      buttonDisable.removeAttribute('disabled')
      var responseErrors = response.forEach(function(error){
        createError(error, 'confirmPassword')
      })
    }
  })
})
