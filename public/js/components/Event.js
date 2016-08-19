import React from 'react'

class Event extends React.Component  {
  constructor(props) {
    super(props)
    this.updateEvents = this.updateEvents.bind(this)
    this.state = {
      events: []
    }
  }
  componentDidMount () {
    this.updateEvents()
  }
  updateEvents() {
    fetchApi('GET', '/api/events.json', {}, (response) => {
      console.log(response)
      this.setState({events: response})
    })
  }
  componentDidUpdate () {
      $('[data-toggle="tooltip"]').tooltip();
  }
    render() {
      var allEvents = this.state.events.map(function(event, key) {
        var imgStyle = {
          backgroundImage: `url(${event.event_images[0]})`
        }
        return (
          <div className="col-xs-12 col-sm-6 col-md-4" key={key}>
            <div className="eventContainer">
              <div className="imgContainer" style={imgStyle}>
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
                    <h3 className="event_host">{event.host.full_name}</h3>
                  </div>
                </div>
                <div className="eventDescContainer">
                  <h3 className="event_title">{event.title}</h3>
                  <p className="event_description">{event.description}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })
      return <div>{allEvents}</div>
    }
  }

  export default Event
