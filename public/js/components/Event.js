import React from 'react'

class Event extends React.Component  {
  constructor(props) {
    super(props)
    this.updateEvents = this.updateEvents.bind(this)
    this.filteredSearch = this.filteredSearch.bind(this)
    this.noResults = this.noResults.bind(this)
    this.updateMap = this.updateMap.bind(this)
    this.state = {
      events: [],
      markerArray: [],
      childrenAllowed: '',
      alcoholAllowed: '',
      guestLimit: '',
      noResultsFound: '',
      noLocationFound: '',
      mapOverlay:<div></div>
    }
  }
  componentDidMount () {
    this.updateEvents()
  }
  updateEvents() {
    fetchApi('GET',`/events.json${window.location.search}`, {}, (response) => {
      this.noResults(response)
      console.log(response)
      var array = response.map(function(event){
        return event.event_marker[0]
      })
      var location =
      this.setState({
        events: response,
        markerArray: array
      })
      this.updateMap()
    })
  }
  updateMap() {
    var handler = Gmaps.build('Google')
    var mapStyle = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]
    handler.buildMap({ provider: {styles: mapStyle, scrollwheel: false}, internal: {id: 'map'}}, () => {

      var markers = handler.addMarkers(this.state.markerArray, {animation: 'DROP'});
      handler.bounds.extendWith(markers);
      handler.fitMapToBounds();
      console.log(this.state.markerArray.length)
      if(this.state.markerArray.length == 1){
        handler.getMap().setZoom(14)
      }
      else if(this.state.markerArray.length == 0){
        var context = this
        var geocoder
        geocoder = new google.maps.Geocoder()
        var location = window.location.search.split("&")[0].replace("?","").split("=")[1]
        geocoder.geocode({'address': location}, function(results, status){
          if(status == 'OK'){
            console.log(results)
            handler.getMap().setZoom(10)
            handler.map.centerOn(results[0].geometry.location)
            context.setState({
              mapOverlay: <img src="/assets/coming_soon2.png" className="map-overlay" />,
              noLocationFound: ''
            })
          }
          else{
            context.setState({
              noLocationFound: 'Location was not found'
            })
          }
        })
      }
    })

  }
  filterGuests(e) {
    this.setState({guestLimit: e.target.value})
    this.filteredSearch({
      alcoholAllowed: this.state.alcoholAllowed,
      childrenAllowed: this.state.childrenAllowed,
      guestLimit: e.target.value,
    })
  }
  filterChildren (e) {
    this.setState({childrenAllowed: e.target.value})
    this.filteredSearch({
      alcoholAllowed: this.state.alcoholAllowed,
      childrenAllowed: e.target.value,
      guestLimit: this.state.guestLimit,
    })
  }
  filterAlcohol (e) {
    this.setState({alcoholAllowed: e.target.value})
    this.filteredSearch({
      alcoholAllowed: e.target.value,
      childrenAllowed: this.state.childrenAllowed,
      guestLimit: this.state.guestLimit,
    })
  }
  filteredSearch (filters) {
    fetchApi('GET',`/events.json${window.location.search}&guest_limit=${filters.guestLimit}&allow_children=${filters.childrenAllowed}&alcohol_allowed=${filters.alcoholAllowed}`, {}, (response) => {
      this.noResults(response)
      var array = response.map(function(event){
        return event.event_marker[0]
      })
      this.setState({
        events: response,
        markerArray: array
      })
      this.updateMap()
    })
  }
  noResults (results) {
    if (results.length === 0) {
      this.setState({
        noResultsFound: 'No Search Results Were Found'
      })
    }
    else {
      this.setState({
        noResultsFound: ''
      })
    }
  }
  redirect (e) {
    if (e.target.classList.contains('hostProfile')) {
      var newLocation = e.target.getAttribute('data-id')
      window.location.pathname = `users/${newLocation}`
    }
    else {
      var newLocation = e.target.getAttribute('data-id')
      window.location.pathname = `events/${newLocation}`
    }
  }
    render() {
      var allEvents = this.state.events.map((event, key) => {
        var imgStyle = {
          backgroundImage: `url(${event.event_images[0]})`
        }
        return (
          <div className="col-xs-12 col-md-6" key={key}>
            <div onClick={(e) => this.redirect(e)} className="eventContainer" data-id={event.id} style={imgStyle}>
              <div className="imgContainer" data-id={event.id}>
                <div className="dateContainer text-center" data-id={event.id}>
                  <span className="date" data-id={event.id}>{event.formatted_date}</span>
                  <br/>
                  <span className="time" data-id={event.id}>{event.formatted_time}</span>
                </div>
              </div>
              <div className="descContainer" data-id={event.id}>
                <div className="profileContainer" data-id={event.id}>
                  <div className="thumbnailContainer" data-id={event.id}>
                    <img src={event.host.user_image} data-id={event.host.id} alt="profile image" className="img-circle hostProfile" />
                  </div>
                  <div className="nameContainer" data-id={event.id}>
                    <h3 className="event_host" data-id={event.id}>{event.host.first_name}</h3>
                  </div>
                </div>
                <div className="eventDescContainer" data-id={event.id}>
                  <h3 className="event_title" data-id={event.id}>{event.title}</h3>
                  {(() => {
                    switch (event.guest_limit) {
                      case null: return <p className="event_guests" data-id={event.id}>Guest Limit: None</p>
                      default: return <p className="event_guests" data-id={event.id}>Guest Limit: {event.guest_limit}</p>
                    }
                  })()}
                  <p className="event_spots_left" data-id={event.id}>Spots Open: {event.spots_left}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })
      return (
      <div>
        <div className="filterBox">
          <div className="container1">
            <label htmlFor="guestLimit" className="guestLimitLabel">Guest Limit</label>
            <select onChange={(e) => this.filterGuests(e)} className="form-control" name="guestLimit" value={this.state.guestLimit}>
              <option value="">-</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="container2">
            <label htmlFor="childrenAllowed" className="childrenAllowedLabel">Children Allowed</label>
            <select onChange={(e) => this.filterChildren(e)} className="form-control" name="childrenAllowed" value={this.state.childrenAllowed}>
              <option value="">-</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="container3">
            <label htmlFor="alcoholAllowed" className="alcoholAllowedLabel">Alcohol Allowed</label>
            <select onChange={(e) => this.filterAlcohol(e)} className="form-control" name="alcoholAllowed" value={this.state.alcoholAllowed}>
              <option value="">-</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <div>
          <div id="map">{this.state.mapOverlay}</div>
        </div>
        <div className="container-fluid content_area">
          <div className="row">
            <div className="col-xs-12 col-sm-7">
              <span>{this.state.noResultsFound} {this.state.noLocationFound}</span>
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
