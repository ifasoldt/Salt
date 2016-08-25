document.getElementById('navSearchLocation').addEventListener('keypress', function (e) {
  if(e.key == 'Enter'){
    e.preventDefault()
    var location = document.getElementById('navSearchLocation').value
    var locationNew = `/events?location=${location}`
    window.location = locationNew
  }
})
