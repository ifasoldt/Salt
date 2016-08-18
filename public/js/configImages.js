// Utilities
function fetchApiImages(method, endpoint, formFields, callback) {
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
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  }

  if (method.toUpperCase() === 'POST') {
	  payload.body = formFields
	  // payload.body = JSON.stringify(formFields)
  }
  if (method.toUpperCase() === 'PATCH') {
	  payload.body = formFields
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
