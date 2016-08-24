import React from 'react'
import { browserHistory } from 'react-router'

class Hosting extends React.Component  {
  constructor(props) {
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.applicationCheck = this.applicationCheck.bind(this)
    this.updateApplications = this.updateApplications.bind(this)
    this.state = {
      hostedEvents: []
    }
  }
  componentDidMount () {
    this.updateUser()
  }
  updateUser() {
    fetchApi('GET','/current_user/dashboard.json', {}, (response) => {
      console.log(response)
      var hostingEvents = response.hosted_events.map((events) => {
        return events
      })
      this.setState({
        hostedEvents: hostingEvents
      })
    })
  }
  applicationCheck (e) {
    var eventID = e.target.getAttribute('data-id')
    var appID = e.target.getAttribute('data-app-id')
    console.log(eventID, appID)
    this.updateApplications(eventID, appID)
  }
  updateApplications (eventID, appID) {
    fetchApi('PATCH',`events/${eventID}/applications/${appID}`, {}, (response) => {
      var hostingEvents = response.hosted_events.map((events) => {
        return events
      })
      this.setState({
        hostedEvents: hostingEvents
      })
    })
  }
  componentDidUpdate () {
      $('[data-toggle="tooltip"]').tooltip()
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
              <td>
                  {(() => {
                    switch (app.status) {
                      case "approved": return <span style={greenColor}>approved</span>;
                      case "denied": return <span style={redColor}>denied</span>;
                      case "pending":  return <div>
                        <i onClick={(e) => this.applicationCheck(e)} data-id={this.state.hostedEvents.id} data-app-id={app.id} className="fa fa-check-circle accept_application" data-toggle="tooltip" data-placement="bottom" title="Accept Application" aria-hidden="true"></i>
                        <i onClick={(e) => this.applicationCheck(e)} data-id={this.state.hostedEvents.id} data-app-id={app.id} className="fa fa-times-circle deny_application" data-toggle="tooltip" data-placement="bottom" title="Reject Application" aria-hidden="true"></i>
                      </div>;
                      default: return <span style={Color}>pending</span>;
                    }
                  })()}
              </td>
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
                  <th>Status</th>
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
