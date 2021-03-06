class Event < ApplicationRecord
  scope :allow_children, -> {where(allow_children: true)}
  scope :alcohol_allowed, -> {where(alcohol_allowed: true)}
  scope :date, -> date {where(date: date)}
  scope :by_period, -> starting_date, ending_date {where(date: starting_date..ending_date)}
  scope :guest_limit, -> guest_limit {order(guest_limit: guest_limit)}
  scope :only_future_events, ->(*) {where("date >= ?", Date.today)}
  scope :chronological, -> (*) {order(:date, :time)}

  has_many :users, through: :applications
  has_many :comments
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
  validates :guest_limit, numericality: {less_than_or_equal_to: 1000000, message: "should really be set to unlimited"}, allow_nil: true
  validates_date :date, :after => lambda { Date.yesterday }, :after_message => "must be a future date"
  validate :date_cannot_be_earlier_today
  validate :guest_limit_xor_unlimited_guests

  def confirmed_guests
    @approved_guests = applications.where(status: 'approved').pluck(:quantity).inject(:+).to_i
  end

  def spots_left
    if guest_limit
      return guest_limit - confirmed_guests
    else
      return "Unlimited"
    end
  end

  def formatted_date
    date.strftime('%A, %b. %d')
  end

  def formatted_time
    self&.time&.strftime('%-l:%M %P')
  end


private

  def date_cannot_be_earlier_today
    if date == Date.today && time.localtime.hour < Time.zone.now.hour
      errors.add(:time, "can't be earlier today!")
    end
  end

  def guest_limit_xor_unlimited_guests
    unless (guest_limit.blank?) ^ (unlimited_guests == false)
      errors.add(:Please, "specify the number of guests or choose unlimited, but not both")
    end
  end

  def address_xor_use_current_address
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


  def self.update_application_statuses
    events = Event.where("date < ?", Date.today).or(Event.where("date = ? AND time < ?", Date.today, Time.current.utc))
    events.each do |event|
      event.applications.each do |app|
        if app.status == ('approved' || 'rateable')
          app.status = 'rateable'
        elsif app.status == 'pending'
          app.status = 'denied'
        end
        app.save
      end
    end
  end

end
