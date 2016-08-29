import React from 'react'

class ShowEvent extends React.Component  {
  constructor(props) {
    super(props)
    this.updateEvents = this.updateEvents.bind(this)
    this.commentsChange = this.commentsChange.bind(this)
    this.post = this.post.bind(this)
    this.setCommentId = this.setCommentId.bind(this)
    this.flag = this.flag.bind(this)
    this.messageHost = this.messageHost.bind(this)
    this.mountSlider = this.mountSlider.bind(this)
    this.messageChange = this.messageChange.bind(this)
    this.joinEvent = this.joinEvent.bind(this)
    this.leaveEvent = this.leaveEvent.bind(this)
    this.messageChange = this.messageChange.bind(this)
    this.quantityChange = this.quantityChange.bind(this)
    this.setButtons = this.setButtons.bind(this)
    this.state = {
      mapLoaded: false,
      events: [],
      sliderImages: [],
      host: [],
      markerArray: [],
      comments: [],
      hiddenComments: [],
      commentId: '',
      value: '',
      messageValue:'',
      appIds: [],
      messageValue: '',
      quantityValue: '',
      msg_button: <div></div>
    }
  }
  componentDidMount () {
    this.updateEvents()
  }
  messageHost(e) {
    fetchApi('POST',`/messages`, {body: this.state.messageValue, recipient_id: this.state.host.id}, (response, statusCode) => {
      if (statusCode >= 200 && statusCode < 300) {
        // is it weird to use jquery here?
        $('#messageHostModal').modal('hide')
        this.setState({messageValue: ''})
      }
      else {
        // fix this when have time
        alert(response)
      }
    })
  }
  flag() {
    fetchApi('PATCH', `/events/${this.state.events.id}/comments/${this.state.commentId}`, {flagged: true}, (response) => {
      $('#commentFlag-modal').modal('hide')
      var hiddenCommentsList = this.state.hiddenComments
      hiddenCommentsList.push(Number(this.state.commentId))
      this.setState({hiddenComments: hiddenCommentsList})
      this.setState({commentId:''})
    })
  }
  setCommentId(e) {
    this.setState({commentId: e.target.getAttribute('data-id')})
  }
  leaveEvent() {
    // I'm not using the :id in the controller, so the last line can be anything as long as it's there.
    fetchApi('DELETE',`/api/events/${this.state.events.id}/applications/leave`, {}, (response, statusCode) => {
      if (statusCode >= 200 && statusCode < 300) {
        var newAppIds = this.state.appIds
        console.log(this.state.appIds)
        console.log("First" + newAppIds)
        console.log(response.user.id)
        var index = newAppIds.indexOf(response.user.id)
        console.log(index)
        newAppIds.splice(index, 1)
        console.log("Second" + newAppIds)
        this.setState({appIds: newAppIds})
        this.setButtons()
      }
      else {
        alert('Error')
      }
    })
  }
  joinEvent() {
    fetchApi('POST',`/api/events/${this.state.events.id}/applications`, {quantity: this.state.quantityValue, message: this.state.messageValue}, (response, statusCode) => {
      if (statusCode >= 200 && statusCode < 300) {
        $('#joinEventModal').modal('hide')
        var newAppIds = this.state.appIds
        newAppIds.unshift(response.user.id)
        this.setState({appIds: newAppIds})
        this.setButtons()
        this.setState({messageValue:''})
        this.setState({quantityValue:''})
      }
      else {
        $('#joinEventErrors').append(response)
      }
    })
  }
  setButtons(){
    if(document.getElementById('profile-box').getAttribute('data-id') == "none"){
      this.setState({msg_button: <div></div>})
    }
    else if(document.getElementById('profile-box').getAttribute('data-id') == this.state.host.id) {
      this.setState({msg_button:
        <div className="text-center">
          <button type="button" className="btn message-button" data-toggle="modal" data-target="#eventModal">Edit Event</button>
        </div>})
    }
    else if (this.state.appIds.includes(parseInt(document.getElementById('profile-box').getAttribute('data-id')))) {
      this.setState({msg_button:<div className="buttonContainer">
                <button type="button" className="btn message-button" onClick={this.leaveEvent}>Leave Event</button>
                <button type="button" className="btn message-button" data-toggle="modal" data-target="#messageHostModal">Message Host</button>
              </div> })
    }
    else {
      this.setState({msg_button:
      <div className="buttonContainer">
        <button type="button" className="btn message-button" data-toggle="modal" data-target="#joinEventModal">Join Event</button>
        <button type="button" className="btn message-button" data-toggle="modal" data-target="#messageHostModal">Message Host</button>
      </div>})
    }
  }
  messageChange(e) {
    this.setState({messageValue: e.target.value})
  }
  post(e) {
    if (e.key === 'Enter') {
      fetchApi('POST',`/events/${this.state.events.id}/comments`, {body: e.target.value}, (response, statusCode) => {
        if (statusCode >= 200 && statusCode < 300) {
          var newComments = this.state.comments
          newComments.unshift(response)

          this.setState({value: '', comments: newComments})
        }
        else {
          alert('Error')
        }
      })
    }
  }
  commentsChange(e) {
    this.setState({value: e.target.value})
  }
  messageChange(e) {
    this.setState({messageValue: e.target.value})
  }
  quantityChange(e) {
    this.setState({quantityValue: e.target.value})
  }
  mountSlider () {
    $("#slider").slick({
      infinite: true,
      arrows: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            infinite: true,
            arrows: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
          }
        }, {
          breakpoint: 300,
          settings: "unslick",
        }]
    })
  }
  updateEvents() {
    fetchApi('GET', `/api/events/${current_event}.json`, {}, (response) => {
      this.setState({
        events: response,
        sliderImages: response.event_images,
        host: response.host,
        markerArray: response.event_marker,
        comments: response.comments,
        appIds: response.event_application_ids
      })
      this.mountSlider()
      this.setButtons()
    })
  }
  componentDidUpdate () {
    if (!this.state.mapLoaded){
      var handler = Gmaps.build('Google')
      var mapStyle = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]
      handler.buildMap({ provider: {styles: mapStyle, scrollwheel: false}, internal: {id: 'map'}}, () => {
      var markers = handler.addMarkers(this.state.markerArray, {animation: 'DROP'});
      handler.bounds.extendWith(markers)
      handler.fitMapToBounds()
      handler.getMap().setZoom(14)
      })
    this.state.mapLoaded = true
    }
  }
    render() {
      var greenColor = {
        color: 'lightgreen'
      }
      var redColor = {
        color: 'red'
      }
      var sliderImageElements = this.state.sliderImages.map((image, key) => {
        var imageStyle = {
          backgroundImage: `url(${image})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }
        return <div style={imageStyle} className="slideImageStyle" key={key}></div>
      })

      var all_comments = this.state.comments.map((comment, key) => {
        if (!this.state.hiddenComments.includes(comment.id) && comment.flagged != true){
          return (
            <div className="panel panel-default commentContainer" key={key}>
              <div className="panel-heading rightContainer">
                <div className="panel-title nameContainer">
                  <h4>{comment.user.full_name} says:</h4>
                  <div className="timeFlagContainer">
                    <h5>{comment.formatted_created_at}</h5>
                    <i className="fa fa-flag commentFlag" aria-hidden="true" data-toggle="modal" data-target="#commentFlag-modal" data-id={comment.id} onClick={(e) => this.setCommentId(e)}></i>
                  </div>
                </div>
              </div>
              <div className="panel-body bodyContainer">
                <p>{comment.body}</p>
              </div>
            </div>
          )
        }
        return(
          <div key={key}></div>
        )
      })
      return (
        <div>
          <div id="slider">
            {sliderImageElements}
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-12 hidden-sm hidden-md hidden-lg">
                <div className="detailsContainer">
                  <div className="titleContainer">
                    <h1 className="eventTitle">{this.state.events.title}</h1>
                  </div>
                  <div className="detailsBottomContainer">
                    <div className="calendarContainer">
                      <div className="iconContainer">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                      </div>
                      <div className="datesContainer">
                        <h4>{this.state.events.formatted_date}</h4>
                        <h4>{this.state.events.formatted_time}</h4>
                      </div>
                    </div>
                    <div className="guestsContainer">
                      <div className="iconContainer">
                        <i className="fa fa-users" aria-hidden="true"></i>
                      </div>
                      <div className="numbersContainer">
                        <h4>{this.state.events.confirmed_guests} attending</h4>
                        <h4>{this.state.events.spots_left} spots left</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-4">
                <div className="hostProfileBox center-block" data-id={this.state.id}>
                  <div className="hostImgBox center-block">
                    <img src={this.state.host.user_image} className="img-responsive center-block hostImg" alt="" />
                    <h2 className="hostsName text-center">{this.state.host.full_name}</h2>
                  </div>
                  {this.state.msg_button}
                </div>
                <div className="eventInfoBox center-block">
                  <div className="eventDescContainer">
                    <div className="iconContainer">
                      <i className="fa fa-cutlery" aria-hidden="true"></i>
                    </div>
                    <div className="infoContainer">
                      <h3>Event Description:</h3>
                      <h4>{this.state.events.description}</h4>
                    </div>
                  </div>
                  <div className="detailsSubContainer">
                    <div className="iconContainer">
                      <i className="fa fa-sticky-note-o" aria-hidden="true"></i>
                    </div>
                    <div className="infoContainer">
                      <h3>Details:</h3>
                      <h4>{this.state.events.food}</h4>
                    </div>
                  </div>
                </div>
                <div className="eventSpecificBox center-block">
                  <div className="childrenContainer">
                    <div className="iconContainer">
                      <i className="fa fa-child" aria-hidden="true"></i>
                    </div>
                    <div className="infoContainer">
                      <h3>Children Welcome?:</h3>
                      <h3 style={this.state.events.allow_children ? greenColor : redColor}>{this.state.events.allow_children ? 'Yes' : 'No'}</h3>
                    </div>
                  </div>
                  <div className="alcoholContainer">
                    <div className="iconContainer">
                      <i className="fa fa-beer" aria-hidden="true"></i>
                    </div>
                    <div className="infoContainer">
                      <h3>Alcohol Welcome?:</h3>
                      <h3 style={this.state.events.alcohol_allowed ? greenColor : redColor} >{this.state.events.alcohol_allowed ? 'Yes' : 'No'}</h3>
                    </div>
                  </div>
                  <div className="guestInfoContainer">
                    <div className="iconContainer">
                      <i className="fa fa-users" aria-hidden="true"></i>
                    </div>
                    <div className="infoContainer">
                      <h3>Guest Limit:</h3>
                      <h3 style={this.state.events.unlimited_guests ? redColor : greenColor}>{this.state.events.guest_limit || "Unlimited"}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-8">
                <div className="hidden-xs">
                  <div className="detailsContainer">
                    <div className="titleContainer">
                      <h1 className="eventTitle">{this.state.events.title}</h1>
                    </div>
                    <div className="calendarContainer">
                      <div className="iconContainer">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                      </div>
                      <div className="datesContainer">
                        <h4>{this.state.events.formatted_date}</h4>
                        <h4>{this.state.events.formatted_time}</h4>
                      </div>
                    </div>
                    <div className="guestsContainer">
                      <div className="iconContainer">
                        <i className="fa fa-users" aria-hidden="true"></i>
                      </div>
                      <div className="numbersContainer">
                        <h4>{this.state.events.confirmed_guests} attending</h4>
                        <h4>{this.state.events.spots_left} spots left</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mapBox">
                  <div id="map"></div>
                </div>
                <div className="commentsBox">
                  <h3 className="commentsTitle"><strong>Questions and Comments</strong></h3>
                  <input encType="text" placeholder="Type a comment here" className="form-control" onKeyPress={this.post} value={this.state.value} onChange={this.commentsChange} />
                  <div className="commentsScrollBox">
                    {all_comments}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="commentFlag-modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">Flag A Comment</h4>
                </div>
                <div className="modal-body">
                  Do you wish to flag this comment as inappropriate or misleading?
                </div>
                <div className="modal-footer">
                  <button encType="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button encType="button" className="btn btn-danger" onClick={this.flag}>Flag Comment</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="messageHostModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">Message The Host Of This Event</h4>
                </div>
                <div className="modal-body">
                <textarea style={{height:'80px'}} encType="text" className="form-control" value={this.state.messageValue} onChange={this.messageChange}></textarea>
                </div>
                <div className="modal-footer">
                  <button encType="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                  <button encType="button" className="btn btn-black" onClick={this.messageHost}>Send Message</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="joinEventModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button encType="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Join Event</h4>
                </div>
                <div className="modal-body">
                  <form method="post" action="#" encType="multipart/form-data" id="current_event_join" data-id="<%= @event.id %>">
                    <div className="form-group">
                      <label htmlFor="application_guests">Number Of Guests</label>
                      <input encType="text" value={this.state.quantityValue} placeholder="Make Sure To Include Yourself" onChange={this.quantityChange} className="form-control" id="application_guests" name="application_guests" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="application_message">Message To Event Creator</label>
                      <textarea encType="text" value={this.state.messageValue} onChange={this.messageChange} id="application_message" className="form-control text_input" name="application_message" placeholder="Describe Guests"></textarea>
                    </div>
                  </form>
                  <div id="joinEventErrors" className="error"></div>
                </div>
                <div className="modal-footer">
                  <button encType="button" id="btn_application_submit" className="btn btn-default" onClick={this.joinEvent}>
                    <span>Submit</span>
                  </button>
                  <button encType="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  export default ShowEvent
