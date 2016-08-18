class EventSerializer < ActiveModel::Serializer
  attributes :id, :description, :food, :guest_limit, :spots_left, :date, :title, :allow_children, :alcohol_allowed, :unlimited_guests, :time, :filter_guests
  belongs_to :host, class_name: 'User'
  has_many :images


  def event_images
    ev_images = []
    object.images.each do |image|
      event_images << Refile.attachment_url(object, image, :fit, 400, 400)
    end
    ev_images
  end

end
