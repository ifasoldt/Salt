document.getElementById('submitEmail').addEventListener('click', function () {
  removeErrors()
  var buttonDisable = document.getElementById('submitEmail')
  buttonDisable.setAttribute('disabled', true)

  var formFields = {
    email: document.getElementById('email').value
  }

  fetchApi('POST','/password_recoveries', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      redirect('/')
      buttonDisable.removeAttribute('disabled')
    }
    else {
      buttonDisable.removeAttribute('disabled')
      var responseErrors = response.forEach(function(error){
        createError(error, 'email')
      })
    }
  })
})
