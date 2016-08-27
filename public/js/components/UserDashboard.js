import React from 'react'
import { browserHistory } from 'react-router'

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
        address: response.address,
        hostedEvents: hostingEvents
      })
    })
  }
    render() {
      return (
        <div className="container-fluid">
          <div className="row">
              <div className="col-xs-12 col-sm-4 user_info">
                <img className="user_image center-block img-responsive" src={this.state.user.user_image} />
                <div className="center-block eventsInfoBox">
                  <span><span>Events Attended:</span> {this.state.user.attended_events_count}</span>
                  <span><span>Events Hosted:</span> {this.state.user.hosted_events_count}</span>
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
                      <div>{this.state.address.street}</div>
                      <span className="user_city">{this.state.address.city},</span>
                      <span className="user_state">{this.state.address.state}</span>
                      <span className="user_zip">{this.state.address.zip}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-7">
                <div className="profileNameBox">
                  <h1>Welcome Back, {this.state.user.full_name}</h1>
                </div>
                <div className="aboutMeBox">
                  <h3>About You:</h3>
                  <div className="aboutMeDescriptionBox">
                    <h5>{this.state.user.description}</h5>
                  </div>
                </div>
                <ul className="nav nav-pills">
                  <li role="presentation">
                    <a onClick={() => browserHistory.push('/current_user/dashboard/hosting')}>Events Hosting</a>
                  </li>
                  <li role="presentation">
                    <a onClick={() => browserHistory.push('/current_user/dashboard/attending')}>Events Attending</a>
                  </li>
                  <li role="presentation" className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown<span className="caret"></span> </a>
                    <ul className="dropdown-menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li role="separator" className="divider"></li>
                      <li><a href="#">Separated link</a></li>
                    </ul>
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
