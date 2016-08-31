import React from 'react'
import { browserHistory, Link } from 'react-router'

class UserDashboard extends React.Component  {
  constructor(props) {
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      user: {},
      address: {}
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
        user: response,
        address: (response.address || {street: "", state: "", zip: "", city: ""}),
        hostedEvents: hostingEvents
      })
    })
  }
    render() {
      return (
        <div className="container-fluid">
          <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-4 user_info">
                <div className="visible-xs hidden-sm hidden-md hidden-lg">
                  <div className="profileNameBox">
                    <h1>Welcome, {this.state.user.full_name}</h1>
                    <h3 className="aboutYou">About You:</h3>
                    <div className="aboutMeDescriptionBox">
                      <h5>{this.state.user.description}</h5>
                    </div>
                  </div>
                </div>
                <div className="center-block profileImageBox">
                  <img className="user_image center-block img-responsive" src={this.state.user.user_image} />
                  <div className="center-block eventsInfoBox">
                    <span><span className="eventsSpan">Events hosted:</span>{this.state.user.hosted_events_count}</span>
                    <span><span className="eventsSpan">Events attended:</span>{this.state.user.attended_events_count}</span>
                  </div>
                </div>
                <div className="center-block personelInfoBox">
                  <div className="personelContainer">
                    <div className="iconContainer">
                      <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                    </div>
                    <div className="infoContainer">
                      <h4>Date of Birth</h4>
                      <p>{this.state.user.date_of_birth}</p>
                    </div>
                  </div>
                  <div className="personelContainer">
                    <div className="iconContainer">
                      <i className="fa fa-phone-square" aria-hidden="true"></i>
                    </div>
                    <div className="infoContainer">
                      <h4>Phone Number</h4>
                      <p>{this.state.user.phone}</p>
                    </div>
                  </div>
                  <div className="personelContainer">
                    <div className="iconContainer">
                      <i className="fa fa-globe" aria-hidden="true"></i>
                    </div>
                    <div className="infoContainer">
                      <h4>Address:</h4>
                      <div className="user_street">{this.state.address.street}</div>
                      {(() => {
                        switch (this.state.address.city) {
                          case null: return <span className="user_city">{this.state.address.city}</span>
                          default: return <span className="user_city">{this.state.address.city},</span>
                        }
                      })()}
                      <span className="user_state">{this.state.address.state}</span>
                      <span className="user_zip">{this.state.address.zip}</span>
                    </div>
                  </div>
                </div>
                <div className="center-block buttonsBox">
                  <a href="#" data-toggle="modal" data-target="#eventModal"><button className="btn">Create Event</button></a>
                  <a href="#" data-toggle="modal" data-target="#profileModal"><button className="btn">Edit Profile</button></a>
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-8">
                <div className="hidden-xs visible-sm visible-md visible-lg">
                  <div className="profileNameBox">
                    <h1>Welcome, {this.state.user.full_name}</h1>
                    <h3 className="aboutYou">About You:</h3>
                    <div className="aboutMeDescriptionBox">
                      <h5>{this.state.user.description}</h5>
                    </div>
                  </div>
                </div>
                <ul className="nav nav-pills">
                  <li role="presentation">
                    <Link onlyActiveOnIndex activeStyle={{color:'white', backgroundColor:'black'}} to='/current_user/dashboard'>Events Hosting</Link>
                  </li>
                  <li role="presentation">
                    <Link activeStyle={{color:'white', backgroundColor:'black'}} to='/current_user/dashboard/attending'>Events Attending</Link>
                  </li>
                  <li role="presentation">
                    <Link activeStyle={{color:'white', backgroundColor:'black'}} to='/current_user/dashboard/inbox'>Inbox</Link>
                  </li>
                </ul>
                <div className="scroll_box">
                {this.props.children}
                </div>
              </div>
            </div>
          </div>
      )
    }
  }

  export default UserDashboard
