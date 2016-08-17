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
      // this.setState({items: response})
    })
  }
    render() {
      var allEvents = this.state.events.map(function(event, key) {
        // var imgStyle = {
        //   backgroundImage: 'url(' + event.event_image + ')'
        // }
        return (
          <div className="col-xs-12 col-sm-6 col-md-4" key={key}>
            <div class="eventContainer">
              <div class="imgContainer">
                <div class="dateContainer text-center">
                  <span class="date">Friday August 19th</span>
                  <br/>
                  <span class="time">7:30pm</span>
                </div>
                <i class="fa fa-eye watchIcon" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="Watch Event"></i>
              </div>
              <div class="descContainer">
                <div class="profileContainer">
                  <div class="thumbnailContainer">
                    <img src="/assets/profileImage.png" alt="profile image" class="img-circle" />
                  </div>
                  <div class="nameContainer">
                    <h3>Name of User</h3>
                  </div>
                </div>
                <div class="eventDescContainer">
                  <h3 class="event_title">Title of Event</h3>
                  <p class="event_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
