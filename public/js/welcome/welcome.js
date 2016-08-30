$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip()
})

var start = document.getElementById("index_date_from").flatpickr({
  minDate: new Date()})
var end = document.getElementById("index_date_to").flatpickr({
  minDate: new Date()})
start.config.onChange = dateObj => end.set("minDate", dateObj.fp_incr(1))
end.config.onChange = dateObj => start.set("maxDate", dateObj.fp_incr(-1))

document.getElementById('submitIndexSearch').addEventListener('click', function () {
  var location = document.getElementById('location').value
  var starting_date = document.getElementById('index_date_from').value
  var ending_date = document.getElementById('index_date_to').value
  if ((location === '' ) || (starting_date === '') || (ending_date === '')) {
      var error = document.getElementById('searchError')
      var button = document.getElementById('submitIndexSearch')
      error.classList.toggle('hiddenError')
      button.setAttribute('disabled', true)
      setTimeout(function(){
        error.classList.toggle('hiddenError')
        button.removeAttribute('disabled')
      }, 2000);
    }
    else {
      var locationNew = `/events?location=${location}&starting_date=${starting_date}&ending_date=${ending_date}`
      window.location = locationNew
    }
})

document.getElementById('location').addEventListener('keypress', function (e) {
  if(e.key == "Enter"){
    var location = document.getElementById('location').value
    var starting_date = document.getElementById('index_date_from').value
    var ending_date = document.getElementById('index_date_to').value
    if ((location === '' ) || (starting_date === '') || (ending_date === '')) {
        var error = document.getElementById('searchError')
        var button = document.getElementById('submitIndexSearch')
        error.classList.toggle('hiddenError')
        button.setAttribute('disabled', true)
        setTimeout(function(){
          error.classList.toggle('hiddenError')
          button.removeAttribute('disabled')
        }, 2000);
      }
      else {
        var locationNew = `/events?location=${location}&starting_date=${starting_date}&ending_date=${ending_date}`
        window.location = locationNew
      }
    }
})
