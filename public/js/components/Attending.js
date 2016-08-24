import React from 'react'
import { browserHistory } from 'react-router'

class Attending extends React.Component  {
  constructor(props) {
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      attendingEvents: []
    }
  }
  componentDidMount () {
    this.updateUser()
  }
  updateUser() {
    fetchApi('GET','/current_user/dashboard.json', {}, (response) => {
      console.log(response)
      this.setState({
        attendingEvents: response.events
      })
    })
  }
    render() {
        var greenColor = {
          color: 'lightgreen'
        }
        var orangeColor = {
          color: 'orange'
        }
        var eventsAttending = this.state.attendingEvents.map((event, key) => {
          return (
              <tr key={key}>
                <td scope="row" className="user_profile">
                  <img className="profile_image img-circle" src={event.event_images[0]} />
                  <a>{event.title}</a>
                </td>
                <td>{event.formatted_date} @ {event.formatted_time}</td>
                <td>{event.spots_left}</td>
                <td><span style={orangeColor}>pending</span></td>
              </tr>
            )
        })
        return (
            <div className="panel panel-default">
              <div className="panel-heading">
                Events Attending
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>When</th>
                    <th>Spots Open</th>
                    <th>Approved</th>
                  </tr>
                </thead>
                <tbody>
                  {eventsAttending}
                </tbody>
              </table>
            </div>
          )
    }
  }

  export default Attending
