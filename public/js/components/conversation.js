import React from 'react'

class Conversation extends React.Component  {
  render(){
    return(
      <div className="col-xs-10" >
        {this.props.conversation.author}
      </div>
    )
  }
}

export default Conversation
