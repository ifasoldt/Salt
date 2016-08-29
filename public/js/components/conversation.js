import React from 'react'

class Conversation extends React.Component  {
  render () {
    return (
      <a href={"/conversations/" + this.props.conversation.id}>
        <div className="conversationContainer">
          <div className="conversationHeader">
            <div className="conversationNameContainer">
              Conversation with {this.props.conversation.message_partner.first_name}
            </div>
            <div className="conversationDateContainer">
              {this.props.conversation.messages[0].created_at}
            </div>
          </div>
          <div className="conversationBody">
            <div className="conversationLeftsideContainer">
              <img className="profile_image img-responsive img-circle" src={this.props.conversation.message_partner.user_image}  />
            </div>
            <div className="conversationRightsideContainer">
              <div className="messagePreviewTitle">Most Recent Message:</div>
              <i>{this.props.conversation.message_preview}</i>
            </div>
          </div>
        </div>
      </a>
    )
  }
}

export default Conversation
