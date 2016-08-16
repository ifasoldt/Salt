class Event < ApplicationRecord
  has_many :users, through: :applications
  belongs_to :host, class_name: 'User'
  has_many :applications
  has_one :address, as: :addressable

end
