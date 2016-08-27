import React from 'react'

class Message extends React.Component  {
  render(){
    console.log(this.props.message.body)
    return(
        <div className="col-xs-12 message-container well well-lg" >
          <div className="message-picture col-xs-2">
            <img className="img-rounded img-responsive" src={this.props.message.author.user_image} />
            <div className="message-date">
              {this.props.message.created_at}
            </div>
          </div>
          <div className="message-body col-xs-8 col-xs-offset-1">
          {this.props.message.body.split('\n').map(function(item) {
            return (
              <span>
              {item}
              <br/>
              </span>
            )
          })}
          </div>
        </div>
    )
  }
}

export default Message
