import React from 'react'

class UserDashboard extends React.Component  {
  constructor(props) {
    super(props)
    this.updateUser = this.updateUser.bind(this)
    this.state = {
      user: []
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
        <div>

        </div>
      )
    }
  }

  export default UserDashboard
