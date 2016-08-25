var nav_start = document.getElementById("nav_starting_date").flatpickr({
	minDate: new Date()
})
var nav_end = document.getElementById("nav_ending_date").flatpickr({
	minDate: new Date()
})
nav_start.config.onChange = dateObj => nav_end.set("minDate", dateObj.fp_incr(1))
nav_end.config.onChange = dateObj => nav_start.set("maxDate", dateObj.fp_incr(-1))

var nav_mobile_start = document.getElementById("nav_mobile_starting_date").flatpickr({
	minDate: new Date()
})
var nav_mobile_end = document.getElementById("nav_mobile_ending_date").flatpickr({
	minDate: new Date()
})
nav_mobile_start.config.onChange = dateObj => nav_mobile_end.set("minDate", dateObj.fp_incr(1))
nav_mobile_end.config.onChange = dateObj => nav_mobile_start.set("maxDate", dateObj.fp_incr(-1))

document.getElementById('hiddenNavAnchor').addEventListener('click', function () {
    var dropBox = document.getElementById('hiddenNav')
    var anchor = document.getElementById('searchGlass')
    anchor.classList.toggle('anchorClicked')
    dropBox.classList.toggle('hideSearch')
})

document.getElementById('navLocation').addEventListener('keypress', function (e) {
  if (e.key == 'Enter') {
    var location = document.getElementById('navLocation').value
    var starting_date = document.getElementById('nav_starting_date').value
    var ending_date = document.getElementById('nav_ending_date').value
    if ((location === '' ) || (starting_date === '') || (ending_date === '')) {
      var error = document.getElementById('error')
      var button = document.getElementById('navSubmitSearch')
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

document.getElementById('navSubmitSearch').addEventListener('click', function () {
  var location = document.getElementById('navLocation').value
  var starting_date = document.getElementById('nav_starting_date').value
  var ending_date = document.getElementById('nav_ending_date').value
  if ((location === '' ) || (starting_date === '') || (ending_date === '')) {
    var error = document.getElementById('error')
    var button = document.getElementById('navSubmitSearch')
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
document.getElementById('navMobileSubmitSearch').addEventListener('click', function () {
  var location = document.getElementById('nav_mobile_Location').value
  var starting_date = document.getElementById('nav_mobile_starting_date').value
  var ending_date = document.getElementById('nav_mobile_ending_date').value
  if ((location === '' ) || (starting_date === '') || (ending_date === '')) {
    var error = document.getElementById('mobileError')
    var button = document.getElementById('navMobileSubmitSearch')
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
