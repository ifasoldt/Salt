document.getElementById('sendMessage').addEventListener('click', function () {
  removeErrors()
  var buttonDisable = document.getElementById('sendMessage')
  buttonDisable.setAttribute('disabled', true)

  var formFields = {
    body: document.getElementById('message').value,
    recipient_id:
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

fetchApi('POST',`/messages`, {body: this.state.messageValue, recipient_id: this.state.host.id}, (response, statusCode) => {
  if (statusCode >= 200 && statusCode < 300) {
    // is it weird to use jquery here?
    $('#messageHostModal').modal('hide')
    this.setState({messageValue: ''})
  }
  else {
    // fix this when have time
    alert(response)
  }
})
