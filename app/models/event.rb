class Event < ApplicationRecord
  has_many :users, through: :applications
  belongs_to :host, class_name: 'User'
  has_many :applications, dependent: :destroy
  has_one :address, as: :addressable, dependent: :destroy
  validates :description, :food, :time, :title, presence: true
  validates :description, length: {maximum: 1000}
  validates :guest_limit, numericality: {greater_than_or_equal_to: 2}, allow_nil: true
  validates_date :date, :after => lambda { Date.yesterday }, :after_message => "must be a future date"
  validate :date_cannot_be_earlier_today
  validate :guest_limit_xor_unlimited_guests
  has_many :thumbs


private

  def date_cannot_be_earlier_today
    if date == Date.today && time.hour < Time.now.hour
      errors.add(:time, "can't be earlier today!")
    end
  end

  def guest_limit_xor_unlimited_guests
    unless (guest_limit.blank?) ^ (unlimited_guests == false)
      errors.add(:Please, "specify the number of guests or choose unlimited, but not both")
    end
  end

end
