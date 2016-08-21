document.getElementById('submitIndexSearch').addEventListener('click', function () {
  removeErrors()
  perior
  var formFields = {
    location: document.getElementById('location').value,
    by_period: {
      starting_date: document.getElementById('index_date_from').value,
      ending_date: document.getElementById('index_date_from').value
    }
  }

  fetchApi('GET','/api/events', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      console.log(response)
      // redirect('/current_user/dashboard')
    }
    else {
      // var responseErrors = response.forEach(function(error){
      //   createError(error, 'sign_up_password_confirm')
      // })
    }
  })
})
