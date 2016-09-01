import React from 'react'
import { browserHistory } from 'react-router'

class Attending extends React.Component  {
  constructor(props) {
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.leaveEvent = this.leaveEvent.bind(this)
    this.state = {
      attendingEvents: []
    }
  }
  componentDidMount () {
    this.updateUser()
  }
  componentDidUpdate () {
    $('[data-toggle="tooltip"]').tooltip()
  }
  updateUser() {
    fetchApi('GET','/current_user/dashboard.json?attending=true', {}, (response) => {
      this.setState({
        attendingEvents: response
      })
    })
  }
  leaveEvent (e) {
    var event_id = e.target.getAttribute('data-id')
    var app_id = e.target.getAttribute('data-app-id')

    fetchApi('DELETE',`/api/events/${event_id}/applications/${app_id}`, {}, (response) => {
      this.updateUser()
    })
  }
    render() {
        var greenColor = {
          color: 'lightgreen'
        }
        var orangeColor = {
          color: 'orange'
        }
        var redColor = {
          color: 'red'
        }
        var eventsAttending = this.state.attendingEvents.map((event, key) => {
          var link = "/events/" + event.id
          return (
              <tr key={key}>
                <td scope="row" className="user_profile">
                  <a href={link}><img className="profile_image img-circle" src={event.square_event_images[0]} />
                  {event.title}</a>
                </td>
                <td><a>{event.formatted_date} @ {event.formatted_time}</a></td>
                <td>{event.spots_left}</td>
                <td>
                  {(() => {
                    switch (event.applications[0].status) {
                      case "approved": return <div>
                        <span style={greenColor}>Approved</span>
                        <i onClick={(e) => this.leaveEvent(e)} data-id={event.id} style={redColor} data-app-id={event.applications[0].id} className="fa fa-times-circle leave_event" data-toggle="tooltip" data-placement="bottom" title="Leave Event" aria-hidden="true"></i>
                      </div>
                      case "denied": return <span style={redColor}>Denied</span>
                      case "pending":  return <div>
                        <span style={orangeColor}>Pending</span>
                        <i onClick={(e) => this.leaveEvent(e)} data-id={event.id} style={redColor} data-app-id={event.applications[0].id} className="fa fa-times-circle leave_event" data-toggle="tooltip" data-placement="bottom" title="Leave Event" aria-hidden="true"></i>
                      </div>
                      default: return <span style={orangeColor}>Pending</span>
                    }
                  })()}
                </td>
              </tr>
            )
        })
        return (
            <div className="panel panel-default">
              <table className="table">
                <thead className="tableHeadAttending">
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
