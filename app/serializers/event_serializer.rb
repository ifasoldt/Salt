class EventSerializer < ActiveModel::Serializer
  attributes :id, :description, :food, :guest_limit, :spots_left, :date, :title, :allow_children, :alcohol_allowed, :unlimited_guests, :time, :filter_guests, :event_images, :formatted_date, :formatted_time, :confirmed_guests, :event_marker
  belongs_to :host, class_name: 'User'
  has_many :images


  def event_images
    ev_images = []
    object.images.each do |image|
      ev_images << Refile.attachment_url(image, :file, :fit, 1000, 1000)
    end
    ev_images
  end

  def formatted_date
    object.date.strftime('%A, %b. %d')
  end

  def formatted_time
    object&.time&.strftime('%-l:%M %P')
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
      marker.infowindow "<img class='img-responsive' width='100' height='100' src='#{Refile.attachment_url(object.images.first, :file, :fit, 400, 400)}' /> #{object.description}"
    end
  end


end
