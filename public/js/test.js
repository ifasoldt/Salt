handler = Gmaps.build('Google');
var mapStyle = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]

// The markers that you want to put in the map.
var markerArray = [{"lat": 39.7684, "lng": -86.1581, "infowindow": "hello!"},{"lat": 39.7641, "lng": -86.1199, "infowindow": "wow!"}]
handler.buildMap({ provider: {styles: mapStyle}, internal: {id: 'map'}}, function(){
  // where you put the marker array.
  markers = handler.addMarkers(markerArray, {animation: 'DROP'});
  handler.bounds.extendWith(markers);
  handler.fitMapToBounds();
});
