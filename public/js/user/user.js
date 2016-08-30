document.getElementById('sendMessage').addEventListener('click', function () {
  removeErrors()
  var recipient = document.getElementById('userID')
  var recipientID = recipient.getAttribute('data-id').value
  
  var buttonDisable = document.getElementById('sendMessage')
  buttonDisable.setAttribute('disabled', true)

  var formFields = {
    body: document.getElementById('message').value,
    recipient_id: recipientID
  }
  fetchApi('POST','/messages', formFields, function (response, statusCode) {
    if (statusCode >= 200 && statusCode < 300) {
      $('#messageUserModal').modal('hide')
    }
    else {
      buttonDisable.removeAttribute('disabled')
      var responseErrors = response.forEach(function(error){
        createError(error, 'message')
      })
    }
  })
})
