import React from 'react'
import { browserHistory } from 'react-router'

class Hosting extends React.Component  {
  constructor(props) {
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      hostedEvents: []
    }
  }
  componentDidMount () {
    this.updateUser()
  }
  updateUser() {
    fetchApi('GET','/current_user/dashboard.json', {}, (response) => {
      var hostingEvents = response.hosted_events.map((events) => {
        return events
      })
      this.setState({
        hostedEvents: hostingEvents
      })
    })
  }
    render() {
      var eventsHosting = this.state.hostedEvents.map((event, key) => {
        var eventApplications = event.applications.map((app, key) => {
            return (
            <tr key={key}>
              <td scope="row" className="user_profile">
                <img className="profile_image img-circle" src={app.application_profile_pic} />
                <a>{app.application_user_name}</a>
              </td>
              <td>{app.quantity}</td>
              <td><i>{app.message}</i></td>
              <td><i className="fa fa-check-circle" aria-hidden="true"></i><i className="fa fa-times-circle deny_application" aria-hidden="true"></i></td>
            </tr>
          )
        }
      )
      return (
          <div className="panel panel-default" key={key}>
            <div className="panel-heading">
              {event.title}
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Guests</th>
                  <th>Messages</th>
                  <th>Approved</th>
                </tr>
              </thead>
              <tbody>
                {eventApplications}
              </tbody>
            </table>
          </div>
        )
      })
      return <div>{eventsHosting}</div>
    }
  }

  export default Hosting
