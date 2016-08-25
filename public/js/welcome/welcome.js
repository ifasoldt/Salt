document.getElementById('submitIndexSearch').addEventListener('click', function () {
  var location = document.getElementById('location').value
  var starting_date = document.getElementById('index_date_from').value
  var ending_date = document.getElementById('index_date_to').value
  var locationNew = `/events?location=${location}&starting_date=${starting_date}&ending_date=${ending_date}`
  window.location = locationNew
})

document.getElementById('location').addEventListener('keypress', function (e) {
  if(e.key == "Enter"){
    var location = document.getElementById('location').value
    var starting_date = document.getElementById('index_date_from').value
    var ending_date = document.getElementById('index_date_to').value
    var locationNew = `/events?location=${location}&starting_date=${starting_date}&ending_date=${ending_date}`
    window.location = locationNew
  }
})

document.getElementById('index_date_from').addEventListener('keypress', function (e) {
  if(e.key == "Enter"){
    var location = document.getElementById('location').value
    var starting_date = document.getElementById('index_date_from').value
    var ending_date = document.getElementById('index_date_to').value
    var locationNew = `/events?location=${location}&starting_date=${starting_date}&ending_date=${ending_date}`
    window.location = locationNew
  }
})

document.getElementById('index_date_to').addEventListener('keypress', function (e) {
  if(e.key == "Enter"){
    var location = document.getElementById('location').value
    var starting_date = document.getElementById('index_date_from').value
    var ending_date = document.getElementById('index_date_to').value
    var locationNew = `/events?location=${location}&starting_date=${starting_date}&ending_date=${ending_date}`
    window.location = locationNew
  }
})

document.getElementById('index_date_from').flatpickr({
	disable: [
		{
			from: "today",
			to: "2016-08-29"
		}
	]
});
