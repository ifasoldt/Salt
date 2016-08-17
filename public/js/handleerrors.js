//removes all errors from modal
function createError (error, append) {
  var div = document.createElement("div")
  div.classList.add('error')
  div.style.color = 'red'
  div.innerHTML = error
  document.getElementById(append).parentElement.appendChild(div)
}
function removeErrors (){
  var errors = document.querySelectorAll('.error')
  for (var i = 0; i < errors.length; i++) {
    errors[i].parentElement.removeChild(errors[i])
  }
}
