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
                <img className="user_image img-responsive" src={this.state.user.user_image} />
                <h4>Events Attended: {this.state.user.attended_events_count}</h4>
                <h4>Events Hosted: {this.state.user.hosted_events_count}</h4>
                <h4>{this.state.user.date_of_birth}</h4>
                <h4>{this.state.user.phone}</h4>
                <h3>Address:</h3>
                <h4>{this.state.address.street}</h4>
                <h4 className="user_city">{this.state.address.city},</h4>
                <h4 className="user_state">{this.state.address.state}</h4>
                <h4 className="user_zip">{this.state.address.zip}</h4>
              </div>
              <div className="col-xs-12 col-sm-7">
                <h2>{this.state.user.full_name}</h2>
                <h4>{this.state.user.description}</h4>
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
