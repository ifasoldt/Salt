document.getElementById('submitPassword').addEventListener('click', function () {
  removeErrors()
  var buttonDisable = document.getElementById('submitPassword')
  buttonDisable.setAttribute('disabled', true)

  var formFields = {
    password: document.getElementById('password').value,
    password_confirmation: document.getElementById('passwordConfirmation').value
  }

  fetchApi('PATCH',`/password_recoveries/${window.location.pathname.split('/')[2]}`, formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      redirect('/')
      buttonDisable.removeAttribute('disabled')
    }
    else {
      buttonDisable.removeAttribute('disabled')
      var responseErrors = response.forEach(function(error){
        createError(error, 'Password')
      })
    }
  })
})
