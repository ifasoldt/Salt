class Event < ApplicationRecord
  has_many :users, through: :applications
  belongs_to :host, class_name: 'User'
  has_many :applications, dependent: :destroy
  has_one :address, as: :addressable, dependent: :destroy
  validates :description, :food, :guest_limit, :time, presence: true
  validates :description, length: {maximum: 1000}
  validates :guest_limit, numericality: {greater_than_or_equal_to: 2}
  validates_date :date, :after => lambda { Date.yesterday }, :after_message => "must be a future date"
  validate :date_cannot_be_earlier_today
  has_many :thumbs

  def date_cannot_be_earlier_today
    if date == Date.today && time < Time.now
      errors.add(:time, "can't be earlier today!")
    end
  end
end
