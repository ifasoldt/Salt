import React from 'react'

class Event extends React.Component  {
  constructor(props) {
    super(props)
    this.updateEvents = this.updateEvents.bind(this)
    this.state = {
      events: []
    }
  }
  componentDidMount () {
    this.updateEvents()
  }
  updateEvents() {
    fetchApi('GET', '/events', {}, (response) => {
      this.setState({items: response})
    })
  }
    render() {
      var allEvents = this.state.events.map(function(event, key) {
        // var imgStyle = {
        //   backgroundImage: 'url(' + event.event_image + ')'
        // }
        return (
          <div className="col-xs-12 col-sm-6 col-md-4" key={key}>

          </div>
        )
      })
      return <div>{allEvents}</div>
    }
  }

  export default Event
