import React from 'react'

class Event extends React.Component  {
  constructor(props) {
    super(props)
    this.updateEvents = this.updateEvents.bind(this)
    this.state = {
      events: [],
      markerArray: []
    }
  }
  componentDidMount () {
    this.updateEvents()
  }
  updateEvents() {
    fetchApi('GET',`/events.json${window.location.search}`, {}, (response) => {
      console.log(response)
      var array = response.map(function(event){
        return event.event_marker[0]
      })
      console.log(array)
      this.setState({
        events: response,
        markerArray: array
      })
    })
  }
  componentDidUpdate () {
      $('[data-toggle="tooltip"]').tooltip()

      var handler = Gmaps.build('Google')
      var mapStyle = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]

      handler.buildMap({ provider: {styles: mapStyle, scrollwheel: false}, internal: {id: 'map'}}, () => {
        var markers = handler.addMarkers(this.state.markerArray, {animation: 'DROP'});
        handler.bounds.extendWith(markers);
        handler.fitMapToBounds();
      })
  }
    render() {
      var allEvents = this.state.events.map(function(event, key) {
        var imgStyle = {
          backgroundImage: `url(${event.event_images[0]})`
        }
        return (
          <div className="col-xs-12 col-md-6" key={key}>
            <div className="eventContainer" style={imgStyle}>
              <div className="imgContainer">
                <div className="dateContainer text-center">
                  <span className="date">{event.formatted_date}</span>
                  <br/>
                  <span className="time">{event.formatted_time}</span>
                </div>
                <i className="fa fa-heart-o watchIcon" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Watch Event"></i>
              </div>
              <div className="descContainer">
                <div className="profileContainer">
                  <div className="thumbnailContainer">
                    <img src={event.host.user_image} alt="profile image" className="img-circle" />
                  </div>
                  <div className="nameContainer">
                    <h3 className="event_host">{event.host.first_name}</h3>
                  </div>
                </div>
                <div className="eventDescContainer">
                  <h3 className="event_title">{event.title}</h3>
                  <p className="event_guests">Guest Limit: {event.guest_limit}</p>
                  <p className="event_spots_left">Spots Open: {event.spots_left}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })
      return (
      <div>
        <div id="map"></div>
        <div className="container-fluid content_area">
          <div className="row">
            <div className="col-xs-12 col-sm-7">
              {allEvents}
            </div>
            <div className="col-xs-12 col-sm-5">
            </div>
          </div>
        </div>
      </div>
    )
    }
  }

  export default Event
