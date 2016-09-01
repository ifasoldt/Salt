class EventSerializer < ActiveModel::Serializer
  attributes :id, :description, :food, :guest_limit, :spots_left, :date, :title, :allow_children, :alcohol_allowed, :unlimited_guests, :time, :filter_guests, :event_images, :formatted_date, :formatted_time, :confirmed_guests, :event_marker, :event_application_ids
  belongs_to :host, class_name: 'User'
  has_many :images
  has_many :comments
  has_many :applications


  def event_images
    ev_images = []
    object.images.each do |image|
      ev_images << Refile.attachment_url(image, :file, :fill, 1000, 1000)
    end
    ev_images
  end

  def event_application_ids
    app_ids = []
    object.applications.each do |app|
      app_ids << app.user.id
    end
    app_ids
  end
  #
  # def test
  #   respond_to do |format|
  #     format.json {
  #     @markers = events_markers(@events)
  #     render json: @markers
  #     }
  #     format.html {}
  #   end
  # end

  def event_marker
    Gmaps4rails.build_markers([object]) do |object, marker|
      marker.lat object.address.lat + ([0.000002, 0.000003, 0.000004, 0.000005, 0.000006, 0.000007, 0.000008].sample) * ([-1, 1].sample)
      marker.lng object.address.lng + ([0.000002, 0.000003, 0.000004, 0.000005, 0.000006, 0.000007, 0.000008].sample) * ([-1, 1].sample)
      # event name, date, time link to event. Guest limit Space Left
      marker.infowindow "<div class='infoWindow'>
      <div class='eventInfoTitle'><a href='/events/#{object.id}'}>#{object.title}</a></div>
        <div class='eventInfoImage'>
          <img class='img-responsive' width='200' height='200' src='#{(Refile.attachment_url(object&.images&.first, :file, :fit, 400, 400)) || "/assets/no_event_image.jpg"}' />
        </div>
        <div class='eventInfoDateTime'>#{object.formatted_date} at #{object.formatted_time}</div>
        <div class='eventInfoGuestLimit'> Guest Limit #{object.guest_limit || "none"} Spots Left: #{object.spots_left} </div>
      </div>"
    end
  end


end
