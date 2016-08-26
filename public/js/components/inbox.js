import React from 'react'
import ReactDOM from 'react-dom'
import Conversation from './conversation'

class Inbox extends React.Component  {
  render(){
    var conversations = this.props.conversations.map((conversation, key) => {
      return <Conversation conversation={conversation} key={key}/>
    })
    return(
      <div>
        {conversations}
      </div>
    )
  }
}

fetchApi('GET', `/events/${this.state.events.id}/comments/${this.state.commentId}`, {}, (response, statusCode) =>{
  var conversations = response
  ReactDOM.render(<Inbox conversations={conversations}/>, document.getElementById('inbox'))
}


export default Inbox

// inbox, conversation, message-box, messages
