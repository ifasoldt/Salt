class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :description, :location, :date_of_birth, :hosted_events_count, :attended_events_count, :full_name, :user_image
  has_one :address, as: :addressable
  has_many :hosted_events, class_name: 'Event', foreign_key: 'host_id'
  has_many :events, through: :applications
  has_many :applications
  has_many :thumbs
  has_many :images

  def user_image
    #object.images.first is sometimes nil so file_attacher method breaks... Need to wrap in an if statement.
    Refile.attachment_url(object.images.first, :file, :fill, 400, 400) if object.images.first
  end

end
