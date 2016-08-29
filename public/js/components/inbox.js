import React from 'react'
import ReactDOM from 'react-dom'
import Conversation from './Conversation'

class Inbox extends React.Component {
  constructor(props) {
    super(props)
    this.updateConversations = this.updateConversations.bind(this)
    this.state = {
      conversations: []
    }
  }
  componentDidMount () {
    this.updateConversations()
  }
  updateConversations () {
    fetchApi('GET', `/conversations.json`, {}, (response) =>{
      console.log(response)
      this.setState({ conversations: response })
    })
  }
  render () {
    var convos = this.state.conversations.map((convo, key) => {
      return <Conversation conversation={convo} key={key}/>
    })
    return (
      <div className="panel panel-default">
        <table className="table">
          <thead className="tableHeadAttending">
            <tr>
              <th>Name</th>
              <th>When</th>
              <th>Most Recent Message</th>
            </tr>
          </thead>
          <tbody>
            {convos}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Inbox
