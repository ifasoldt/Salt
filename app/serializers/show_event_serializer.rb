class ShowEventSerializer < ActiveModel::Serializer
  attributes :id, :description, :food, :guest_limit, :spots_left, :title, :allow_children, :alcohol_allowed, :unlimited_guests, :formatted_date, :formatted_time, :confirmed_guests, :event_marker, :landscape_event_images, :event_application_ids
  belongs_to :host, class_name: 'User'
  has_many :comments

  #
  def landscape_event_images
    ev_images = []
    object.images.each do |image|
      ev_images << Refile.attachment_url(image, :file, :fill, 1200, 400)
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

  def event_marker
    Gmaps4rails.build_markers([object]) do |object, marker|
      marker.lat object.address.lat + ([0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008].sample) * ([-1, 1].sample)
      marker.lng object.address.lng + ([0.002, 0.003, 0.004, 0.005, 0.006, 0.007, 0.008].sample) * ([-1, 1].sample)
      if object.images.any?
        # event name, date, time link to event. Guest limit Space Left
        marker.infowindow "<div class='infoWindow'>
        <div class='eventInfoTitle'><a href='/events/#{object.id}'}>#{object.title}</a></div>
          <div class='eventInfoImage'>
            <img class='img-responsive' width='200' height='200' src='#{Refile.attachment_url(object.images.first, :file, :fit, 200, 200)}' />
          </div>
          <div class='eventInfoDateTime'>#{object.formatted_date} at #{object.formatted_time}</div>
          <div class='eventInfoGuestLimit'> Guest Limit #{object.guest_limit || "none"} Spots Left: #{object.spots_left} </div>
        </div>"
      else
        marker.infowindow "<div class='infoWindow'>
        <div class='eventInfoTitle'><a href='/events/#{object.id}'}>#{object.title}</a></div>
          <div class='eventInfoImage'>
            <img class='img-responsive' width='200' height='200' src='/assets/no_event_image.jpeg' />
          </div>
          <div class='eventInfoDateTime'>#{object.formatted_date} at #{object.formatted_time}</div>
          <div class='eventInfoGuestLimit'> Guest Limit #{object.guest_limit || "none"} Spots Left: #{object.spots_left} </div>
        </div>"
      end
    end
  end


end
