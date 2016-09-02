import React from 'react'

class Message extends React.Component  {
  render(){
    return(
        <div className="conversationContainer">
          <div className="conversationHeader">
            {this.props.message.created_at}
          </div>
          <div className="conversationBody">
            <div className="conversationLeftsideContainer">
              <img className="profile_image img-responsive img-circle" src={this.props.message.author.user_image}  />
            </div>
            <div className="conversationRightsideContainer">
              {this.props.message.body.split('\n').map(function(item, key) {
                return (
                  <span key={key}>
                  {item}
                  <br/>
                  </span>
                )
              })}
            </div>
          </div>
        </div>
    )
  }
}

export default Message
