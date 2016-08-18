class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :phone, :description, :location, :date_of_birth, :hosted_events_count, :attended_events_count
  has_one :address, as: :addressable
  has_many :hosted_events, class_name: 'Event', foreign_key: 'host_id'
  has_many :events, through: :applications
  has_many :applications
  has_many :thumbs


end
