class EventIndexSerializer < ActiveModel::Serializer
  attributes :id, :food, :guest_limit, :spots_left, :date, :title, :allow_children, :alcohol_allowed, :unlimited_guests, :time, :filter_guests, :event_images, :formatted_date, :formatted_time, :confirmed_guests, :event_marker
  belongs_to :host, class_name: 'User'


  def event_images
    ev_images = []
    object.images.each do |image|
      ev_images << Refile.attachment_url(image, :file, :fill, 400, 300)
    end
    ev_images
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
            <img class='img-responsive' width='200' height='200' src='#{Refile.attachment_url(object.images.first, :file, :fit, 100, 100)}' />
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
