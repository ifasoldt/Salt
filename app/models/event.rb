class Event < ApplicationRecord
  scope :allow_children, -> {where(allow_children: true)}
  scope :alcohol_allowed, -> {where(alcohol_allowed: true)}
  scope :date, -> date {where(date: date)}
  scope :by_period, -> starting_date, ending_date {where(date: starting_date..ending_date)}
  scope :guest_limit, -> guest_limit {order(guest_limit: guest_limit)}
  scope :only_future_events, ->(*) {where("date >= ?", Date.today)}
  default_scope {order(:date, :time)}

  has_many :users, through: :applications
  belongs_to :host, class_name: 'User'
  has_many :applications, dependent: :destroy
  has_one :address, as: :addressable, dependent: :destroy
  accepts_nested_attributes_for :address
  validates_associated :address
  validates_presence_of :address
  has_many :thumbs
  has_many :images, as: :imageable, dependent: :destroy
  accepts_attachments_for :images, attachment: :file

  validates :description, :food, :time, :title, presence: true
  validates :description, length: {maximum: 1000}
  validates :guest_limit, numericality: {greater_than_or_equal_to: 2}, allow_nil: true
  validates_date :date, :after => lambda { Date.yesterday }, :after_message => "must be a future date"
  validate :date_cannot_be_earlier_today
  validate :guest_limit_xor_unlimited_guests



  def spots_left
    @approved_guests = applications.where(status: 'approved').pluck(:quantity).inject(:+).to_i
    if guest_limit
      return guest_limit - @approved_guests
    else
      return "The host has not limited the size of this meal"
    end
  end


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

  #location can be an address or a lat/long array
  def self.nearby(location)
    address_ids = Address.close_events(location).ids
    @nearby_events = Event.joins(:address).where("addresses.id IN (?)", address_ids)
    @nearby_events
  end


end
