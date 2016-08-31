import React from 'react'
import { browserHistory } from 'react-router'

class Hosting extends React.Component  {
  constructor(props) {
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.applicationCheck = this.applicationCheck.bind(this)
    this.updateApplications = this.updateApplications.bind(this)
    this.rateUser = this.rateUser.bind(this)
    this.state = {
      hostedEvents: []
    }
  }
  componentDidMount () {
    this.updateUser()
  }
  updateUser() {
    fetchApi('GET','/current_user/dashboard.json?hosting=true', {}, (response) => {
      var hostingEvents = response
      this.setState({
        hostedEvents: hostingEvents
      })
      $('[data-toggle="tooltip"]').tooltip()
    })
  }
  applicationCheck (e) {
    var eventID = e.target.getAttribute('data-id')
    var appID = e.target.getAttribute('data-app-id')
    var status = e.target.getAttribute('data-stat-id')
    this.updateApplications(eventID, appID, status)
  }
  updateApplications (eventID, appID, status) {
    fetchApi('PATCH',`/api/events/${eventID}/applications/${appID}`, {status: status}, (response) => {
      this.updateUser()
    })
  }
  rateUser (e) {
    var eventID = e.target.getAttribute('data-event-id')
    var userID = e.target.getAttribute('data-user-id')
    var vote = e.target.getAttribute('data-vote-id')
    var appID = e.target.getAttribute('data-app-id')
    fetchApi('POST','/thumbs', {event_id: eventID, user_id: userID, category: vote, app_id: appID}, (response) => {
      console.log(response)
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
      var eventsHosting = this.state.hostedEvents.map((event, key) => {
        var linkEvent = "/events/" + event.id
        var eventApplications = event.applications.map((app, key) => {
          var link = "/users/" + app.app_user_id
            return (
            <tr key={key}>
              <td scope="row" className="user_profile">
                <a href={link}><img className="profile_image img-circle" src={app.application_profile_pic} />
                {app.application_user_name}</a>
              </td>
              <td>
                // <div className="votesContainer">
                //   <div className="votesContainerUp" data-toggle="tooltip" data-placement="bottom" title="Upvotes" aria-hidden="true">
                //     <i style={greenColor} className="fa fa-thumbs-up thumbUpVotes"></i>
                //     <span>{app.user_thumbs_up}</span>
                //   </div>
                //   <div className="votesContainerDown" data-toggle="tooltip" data-placement="bottom" title="Downvotes" aria-hidden="true">
                //     <i style={redColor} className="fa fa-thumbs-down thumbDownVotes"></i>
                //     <span>{app.user_thumbs_down}</span>
                //   </div>
                // </div>
              </td>
              <td>{app.quantity}</td>
              <td><i>{app.message}</i></td>
              <td>
                  {(() => {
                    switch (app.status) {
                      case "approved": return <div>
                        <span style={greenColor}>Approved</span>
                        <i onClick={(e) => this.applicationCheck(e)} data-id={app.app_event_id} style={redColor} data-stat-id="denied" data-app-id={app.id} className="fa fa-times-circle deny_application" data-toggle="tooltip" data-placement="bottom" title="Reject Application" aria-hidden="true"></i>
                      </div>
                      case "denied": return <div>
                        <span style={redColor}>Denied</span>
                        <i onClick={(e) => this.applicationCheck(e)} data-id={app.app_event_id} style={greenColor} data-stat-id="approved" data-app-id={app.id} className="fa fa-check-circle accept_application" data-toggle="tooltip" data-placement="bottom" title="Accept Application" aria-hidden="true"></i>
                      </div>
                      case "pending":  return <div>
                        <i onClick={(e) => this.applicationCheck(e)} data-id={app.app_event_id} style={greenColor} data-stat-id="approved" data-app-id={app.id} className="fa fa-check-circle accept_application" data-toggle="tooltip" data-placement="bottom" title="Accept Application" aria-hidden="true"></i>
                        <i onClick={(e) => this.applicationCheck(e)} data-id={app.app_event_id} style={redColor} data-stat-id="denied" data-app-id={app.id} className="fa fa-times-circle deny_application" data-toggle="tooltip" data-placement="bottom" title="Reject Application" aria-hidden="true"></i>
                      </div>
                      case "rateable": return <div>
                        <i onClick={(e) => this.rateUser(e)} data-event-id={app.app_event_id} data-app-id={app.id} style={
                          (() => {
                            switch (app.thumb_status) {
                              case null: return {color:'black'}
                              case "up": return greenColor
                              default: return {color:'black'}
                            }
                          })()
                        } data-vote-id="up" data-user-id={app.app_user_id} className="fa fa-thumbs-up thumbUp" data-toggle="tooltip" data-placement="bottom" title="Upvote User" aria-hidden="true"></i>

                        <i onClick={(e) => this.rateUser(e)} data-event-id={app.app_event_id} data-app-id={app.id} style={
                          (() => {
                            switch (app.thumb_status) {
                              case null: return {color:'black'}
                              case "down": return redColor
                              default: return {color:'black'}
                            }
                          })()
                        } data-vote-id="down" data-user-id={app.app_user_id} className="fa fa-thumbs-down thumbDown" data-toggle="tooltip" data-placement="bottom" title="Downvote User" aria-hidden="true"></i>
                      </div>
                      default: return <span style={Color}>Pending</span>
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
              <a href={linkEvent} className="linkToHostedEvent">{event.title}</a>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th className="nameHeader">Name</th>
                  <th className="thumbsHeader">Thumbs</th>
                  <th className="quantityHeader">Guests</th>
                  <th className="messageHeader">Messages</th>
                  <th className="statusHeader">Status</th>
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
