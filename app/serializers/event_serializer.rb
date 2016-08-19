class EventSerializer < ActiveModel::Serializer
  attributes :id, :description, :food, :guest_limit, :spots_left, :date, :title, :allow_children, :alcohol_allowed, :unlimited_guests, :time, :filter_guests, :event_images, :formated_date, :formatted_time
  belongs_to :host, class_name: 'User'
  has_many :images


  def event_images
    ev_images = []
    object.images.each do |image|
      ev_images << Refile.attachment_url(image, :file, :fit, 400, 400)
    end
    ev_images
  end

  def formatted_date
    object.date.strftime('%A, %b. %d')
  end

  def formatted_time
    object.time.strftime('%-l:%M %P')
  end


end
