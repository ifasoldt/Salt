class User < ApplicationRecord
  has_secure_password
  has_one :birthday
  has_one :address, as: :addressable
  has_many :hosted_events, class_name: 'Event', foreign_key: 'host_id'
  has_many :events, through: :applications
  has_many :applications
end
