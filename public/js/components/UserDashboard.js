import React from 'react'

class UserDashboard extends React.Component  {
  constructor(props) {
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      user: {}
    }
  }
  componentDidMount () {
    this.updateUser()
  }
  updateUser() {
    fetchApi('GET','/current_user/dashboard.json', {}, (response) => {
      console.log(response)
      this.setState({
        user: response
      })
    })
  }
    render() {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <h2>{this.state.user.full_name}</h2>
            </div>
          </div>
        </div>
      )
    }
  }

  export default UserDashboard
