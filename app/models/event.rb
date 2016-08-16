class Event < ApplicationRecord
  has_many :users, through: :applications
  belongs_to :host, class_name: 'User'
  has_many :applications, dependent: :destroy
  has_one :address, as: :addressable, dependent: :destroy
  validates :description, :food, :drink, :guest_limit, :time, presence: true
  validates :description, length: {maximum: 1000}
  validates :guest_limit, numericality: {greater_than_or_equal_to: 2}
  has_many :thumbs

end
