// API Host
// var api = 'https://arcane-harbor-93523.herokuapp.com'
var api = 'https://infinite-cove-48463.herokuapp.com/'
// var api = 'https://c4f482c0.ngrok.io'
var production = false

// Utilities
function fetchApi(method, endpoint, formFields, callback) {
  var statusCode,
      payload

  if (method === undefined) {
    method = 'POST'
  }

  if (formFields === undefined || formFields === null || formFields === '') {
    formFields = {}
  }

  payload = {
    credentials: 'include',
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (method.toUpperCase() === 'POST') {
	  payload.body = JSON.stringify(formFields)
  }
  if (method.toUpperCase() === 'PATCH') {
	  payload.body = JSON.stringify(formFields)
  }

  fetch(api + endpoint, payload)
    .then(function(response) {
	     statusCode = response.status
      return response.json()
    })
    .then(function(data) {
      if (typeof callback === 'function') {
        callback(data, statusCode)
      }
    })
}

function redirect(url) {
  window.location.href = url
}
