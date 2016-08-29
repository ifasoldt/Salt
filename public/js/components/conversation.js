import React from 'react'

class Conversation extends React.Component  {
  render () {
    return (
        <tr className="conversationTable">
          <td scope="row" className="user_profile">
            <img className="profile_image img-circle" src={this.props.conversation.message_partner.user_image}  />
            <a>{this.props.conversation.message_partner.first_name}</a>
          </td>
          <td><a href={"/conversations/" + this.props.conversation.id}>{this.props.conversation.messages[0].created_at}</a></td>
          <td><a href={"/conversations/" + this.props.conversation.id}>{this.props.conversation.message_preview}</a></td>
        </tr>
      //
      // <a href={"/conversations/" + this.props.conversation.id}>
      //   <div className="col-xs-10 conversation-container" >
      //     <div className="col-xs-2">
      //       <img className="img-responsive img-circle" src={this.props.conversation.message_partner.user_image} />
      //     </div>
      //     <div className="col-xs-2">
      //       <h4>{this.props.conversation.message_partner.first_name}</h4>
      //       <h4>{this.props.conversation.messages[0].created_at}</h4>
      //     </div>
      //     <div className="col-xs-8 message-preview">
      //       {this.props.conversation.message_preview}
      //     </div>
      //   </div>
      // </a>
    )
  }
}

export default Conversation
