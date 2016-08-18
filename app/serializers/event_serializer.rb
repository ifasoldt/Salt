class EventSerializer < ActiveModel::Serializer
  attributes :id, :description, :food, :guest_limit, :spots_left, :date, :title, :allow_children, :alcohol_allowed, :unlimited_guests, :time, :filter_guests
  belongs_to :host, class_name: 'User'

end
