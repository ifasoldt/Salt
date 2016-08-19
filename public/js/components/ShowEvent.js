import React from 'react'

class ShowEvent extends React.Component  {
  constructor(props) {
    super(props)
    this.updateEvents = this.updateEvents.bind(this)
    this.state = {
      events: [],
      sliderImages: [],
      host: []
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
        host: response.host
      })
    })
  }
  componentDidUpdate () {
    $("#slider").slick({
      infinite: false,
      arrows: true,
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            infinite: true
          }
        }, {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            dots: true
          }
        }, {
          breakpoint: 300,
          settings: "unslick"
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
          <div className="row contentRow">
            <div className="col-xs-12 col-sm-4">
              <div id="slider">
                {sliderImageElements}
              </div>
            </div>
            <div className="col-xs-12 col-sm-8">
              <div className="mainContainer">
                <div className="headContainer">
                  <div className="titleContainer">
                    <h1 className="eventTitle">{this.state.events.title}</h1>
                  </div>
                  <div className="spotsContainer">
                    <div className="goingContainer">
                      <span>{this.state.events.confirmed_guests} attending</span>
                    </div>
                    <div className="openContainer">
                      <span>{this.state.events.spots_left} spots left</span>
                    </div>
                  </div>
                </div>
                <div className="descContainer">
                  <h4 className="eventDate">{this.state.events.formatted_date} @</h4>
                  <h4 className="eventTime">{this.state.events.formatted_time}</h4>
                  <h4 className="eventDesc">Description of Event:</h4>
                  <p className="eventDescText">{this.state.events.description}</p>
                  <h4 className="foodDesc">Description of Food:</h4>
                  <p className="foodDescText">{this.state.events.food}</p>
                </div>
                <div className="highlightsContainer">
                  <p>Children Welcome: <span style={this.state.events.allow_children ? greenColor : redColor}>{this.state.events.allow_children ? 'Yes' : 'No'}</span></p>
                  <p>Alcohol Welcome: <span style={this.state.events.alcohol_allowed ? greenColor : redColor}>{this.state.events.alcohol_allowed ? 'Yes' : 'No'}</span></p>
                  <p>No Size Limit: <span style={this.state.events.unlimited_guests ? greenColor : redColor}>{this.state.events.unlimited_guests ? 'Yes' : 'No'}</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <div className="hostProfileContainer">
                <div className="hostImgContainer">
                  <img src={this.state.host.user_image} className="img-circle hostImg" alt="" />
                </div>
                <div className="hostTextContainer">
                  <div className="hostNameContainer">
                    <h2 className="hostsName">{this.state.host.full_name}</h2>
                  </div>
                  <div className="hostBioContainer">
                    <p className="hostBio">{this.state.host.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  export default ShowEvent
