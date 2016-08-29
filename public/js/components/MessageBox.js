import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageBox extends React.Component {
  constructor(props) {
    super(props)
    this.post = this.post.bind(this)
    this.messageChange = this.messageChange.bind(this)
    this.state = {
      messages: this.props.conversation.messages,
      value: ''
    }
  }
  post(e) {
    fetchApi('POST',`/messages`, {body: this.state.value, recipient_id: this.props.conversation.message_partner.id}, (response, statusCode) => {
      if (statusCode >= 200 && statusCode < 300) {
        var newMessages = this.state.messages
        newMessages.unshift(response)
        this.setState({value: '', messages: newMessages})
      }
      else {
        alert(response)
      }
    })
  }
  messageChange(e) {
    this.setState({value: e.target.value})
  }
  render(){
    var allMessages = this.state.messages.map((message, key) => {
      return <Message message={message} key={key}/>
    })
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <div className="profileImageBox center-block">
              <img className="user_image img-responsive" src={this.props.conversation.message_partner.user_image} />
              <h2 className="text-center">{this.props.conversation.message_partner.first_name}</h2>
            </div>
          </div>
          <div className="col-xs-12 col-sm-8">
            <div className="messageBox">
              <h2>Compose a new message to {this.props.conversation.message_partner.first_name}</h2>
              <textarea style={{height:'80px'}} type="text" className="form-control" value={this.state.value} onChange={this.messageChange}></textarea>
              <button type="button" className="btn" onClick={this.post}>Send Message</button>
            </div>
            <div className="conversationBox">
              {allMessages}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

fetchApi('GET', `/conversations/${window.location.pathname.split("/")[2]}.json`, {}, (response, statusCode) =>{
  console.log(response)
  var conversation = response
  ReactDOM.render(<MessageBox conversation={conversation}/>, document.getElementById('MessageBox'))
})

export default MessageBox
