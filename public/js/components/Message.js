import React from 'react'

class Message extends React.Component  {
  render(){
    return(
          <div className="messageContainer">
            <div className="messagePictureContainer">
              <img className="img-rounded img-responsive" src={this.props.message.author.user_image} />
            </div>
            <div className="messageContentContainer">
              <div className="messageDateContainer">
                {this.props.message.created_at}
              </div>
              <div className="messageBodyContainer">
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
