handler = Gmaps.build('Google');
handler.buildMap({ provider: {}, internal: {id: 'map'}}, function(){
  markers = handler.addMarkers([
    {
      "lat": 39.7684,
      "lng": 86.1581,
      "picture": {
        "url": "http://people.mozilla.com/~faaborg/files/shiretoko/firefoxIcon/firefox-32.png",
        "width":  32,
        "height": 32
      },
      "infowindow": "hello!"
    }
  ]);
  handler.bounds.extendWith(markers);
  handler.fitMapToBounds();
});
