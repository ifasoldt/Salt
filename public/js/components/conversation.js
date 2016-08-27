import React from 'react'

class Conversation extends React.Component  {
  
  render(){
    return(
      <a href={"/conversation/" + this.props.conversation.id}>
        <div className="col-xs-10" >
          <div className="col-xs-2">
            <img className="img-responsive" src={this.props.conversation.message_partner.user_image} />
          </div>
          <div className="col-xs-2">
            <h5>{this.props.conversation.message_partner.first_name}</h5>
            <h5>{this.props.conversation.messages[0].created_at}</h5>
          </div>
          <div className="col-xs-8">
            {this.props.conversation.messages[0].body}
          </div>
        </div>
      </a>
    )
  }
}

export default Conversation
