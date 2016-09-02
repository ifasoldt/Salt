import React from 'react'
import { browserHistory } from 'react-router'

class Hosting extends React.Component  {
  constructor(props) {
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.applicationCheck = this.applicationCheck.bind(this)
    this.updateApplications = this.updateApplications.bind(this)
    this.rateUser = this.rateUser.bind(this)
    this.updateToolTips = this.updateToolTips.bind(this)
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
      this.updateToolTips()
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
    this.updateToolTips()
  }
  componentDidUpdate () {
    this.updateToolTips()
  }
  updateToolTips () {
    $('[data-toggle="tooltip"]').tooltip()
  }
  rateUser (e) {
    var eventID = e.target.getAttribute('data-event-id')
    var userID = e.target.getAttribute('data-user-id')
    var vote = e.target.getAttribute('data-vote-id')
    var appID = e.target.getAttribute('data-app-id')
    fetchApi('POST','/thumbs', {event_id: eventID, user_id: userID, category: vote, app_id: appID}, (response) => {
      this.updateUser()
    })
    this.updateToolTips()
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
            <div className="applicationSingleContainer" key={key}>
              <div className="applicationSingleHeaderContainer">
                <a href={link}><img className="profile_image img-circle" src={app.application_profile_pic} />
                {app.application_user_name}</a>
              </div>
              <div className="votesContainer">
                <div className="votesContainerUp">
                  <i style={greenColor} className="fa fa-thumbs-up thumbUpVotes" data-toggle="tooltip" data-placement="bottom" title="Upvotes" aria-hidden="true"></i>
                  <span className="thumbVotesNumber">{app.user_thumbs_up}</span>
                </div>
                <div className="votesContainerDown">
                  <i style={redColor} className="fa fa-thumbs-down thumbDownVotes" data-toggle="tooltip" data-placement="bottom" title="Downvotes" aria-hidden="true"></i>
                  <span className="thumbVotesNumber">{app.user_thumbs_down}</span>
                </div>
              </div>
              <div className="applicationSingleQuantityContainer">{app.quantity}</div>
              <div className="applicationSingleMessageContainer"><i>{app.message}</i></div>
              <div className="applicationSingleStatusContainer">
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
              </div>
            </div>
          )
        }
      )
      return (
          <div className="hostingEventContainer" key={key}>
              <div className="hostingEventTitleContainer">
                <a href={linkEvent} className="linkToHostedEvent">{event.title}</a>
                <div className="hostingEventTitleDateContainer">
                  {event.formatted_date} @ {event.formatted_time}
                </div>
              </div>
              <div className="applicationsHeaderContainer">
                <div className="nameHeader">Name</div>
                <div className="thumbsHeader">Thumbs</div>
                <div className="quantityHeader">Guests</div>
                <div className="messageHeader">Messages</div>
                <div className="statusHeader">Status</div>
              </div>
              {(() => {
                  switch (event.applications.length) {
                    case 0: return <div className="noApplications"><i>There are no applications at this time</i></div>
                    default: return eventApplications
                  }
                })()}
          </div>
        )
      })
      return <div>{eventsHosting}</div>
    }
  }

  export default Hosting
