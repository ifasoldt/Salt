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
      <div>
        {convos}
      </div>
    )
  }
}

export default Inbox
