import React from 'react'

class ShowEvent extends React.Component  {
  constructor(props) {
    super(props)
    this.updateEvents = this.updateEvents.bind(this)
    this.state = {
      events: [],
      sliderImages: [],
      host: [],
      markerArray: []
    }
  }
  componentDidMount () {
    this.updateEvents()
  }
  updateEvents() {
    fetchApi('GET', `/api/events/${current_event}.json`, {}, (response) => {
      console.log(response)
      this.setState({
        events: response,
        sliderImages: response.event_images,
        host: response.host,
        markerArray: response.event_marker
      })
    })
  }
  componentDidUpdate () {
      var handler = Gmaps.build('Google')
      var mapStyle = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]
      handler.buildMap({ provider: {styles: mapStyle, scrollwheel: false}, internal: {id: 'map'}}, () => {
      var markers = handler.addMarkers(this.state.markerArray, {animation: 'DROP'});
      handler.bounds.extendWith(markers)
      handler.fitMapToBounds()
      handler.getMap().setZoom(14)
    })
    $("#slider").slick({
      infinite: true,
      arrows: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            infinite: true,
            arrows: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
          }
        }, {
          breakpoint: 300,
          settings: "unslick",
        }]
    })
  }
    render() {
      var greenColor = {
        color: 'lightgreen'
      }
      var redColor = {
        color: 'red'
      }
      var sliderImageElements = this.state.sliderImages.map((image, key) => {
        var imageStyle = {
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }
        return <div style={imageStyle} className="slideImageStyle" key={key}></div>
      })
      return (
        <div>
          <div id="slider">
            {sliderImageElements}
          </div>
          <div className="container-fluid">
            <div className="row whitebar">
              <div className="col-xs-4 col-sm-2">
                <div className="hostProfileContainer">
                  <div className="row hostImgContainer">
                    <img src={this.state.host.user_image} className="img-circle hostImg" alt="" />
                  </div>
                  <div className="row hostTextContainer profile-text-margin">
                    <h2 className="hostsName text-center">{this.state.host.first_name}</h2>
                  </div>
                </div>
                <div className="col-xs-4 col-sm-2">
                </div>
              </div>
              <div className="text-center col-xs-12 col-sm-4">
                <h1 className="eventTitle">{this.state.events.title}</h1>
              </div>
              <div className="col-xs-6 col-sm-3">
                <img src="/assets/calendar-icon.png" className="col-xs-4 img-responsive" alt="" />
                <h4 className="eventDate">{this.state.events.formatted_date}</h4>
                <h4 className="eventTime">{this.state.events.formatted_time}</h4>
              </div>
              <div className=" col-xs-6 col-sm-3">
                <img src="/assets/guests.png" className="col-xs-4 img-responsive" alt="" />
                <div className="col-xs-8 guests-nums">
                  <h4 className="row">{this.state.events.confirmed_guests} attending</h4>
                  <h4 className="row">{this.state.events.spots_left} spots left</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <div className="mainContainer">
                  <div className="descContainer">
                    <h3 className="eventDesc">Event Description:</h3>
                    <h4 className="eventDescText">{this.state.events.description}</h4>
                    <h3 className="foodDesc">Details:</h3>
                    <h4 className="foodDescText">Food/Drink:{this.state.events.food}</h4>
                    <h4>Children Welcome: <span style={this.state.events.allow_children ? greenColor : redColor}>{this.state.events.allow_children ? 'Yes' : 'No'}</span></h4>
                    <h4>Alcohol Welcome: <span style={this.state.events.alcohol_allowed ? greenColor : redColor}>{this.state.events.alcohol_allowed ? 'Yes' : 'No'}</span></h4>
                    <h4>Guest Limit: <span style={this.state.events.unlimited_guests ? redColor : greenColor}>{this.state.events.guest_limit || "Unlimited"}</span></h4>
                  </div>
                </div>
              </div>
              <div className="col-xs-6" id="map" style={{height: '600px'}}></div>
            </div>
          </div>
        </div>
      )
    }
  }

  export default ShowEvent
