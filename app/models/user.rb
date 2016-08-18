class User < ApplicationRecord
  has_secure_password
  has_one :address, as: :addressable, dependent: :destroy
  has_many :hosted_events, class_name: 'Event', foreign_key: 'host_id', dependent: :destroy
  has_many :events, through: :applications
  has_many :applications, dependent: :destroy
  has_many :thumbs
  has_many :host_thumbs, class_name: 'Thumb', foreign_key: 'host_id'
  has_many :image, as: :imageable, dependent: :destroy
  accepts_attachments_for :images


  validates :first_name, :last_name, :email, :date_of_birth, presence: true
  validates :first_name, :last_name, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
  validates :email, format: {with: /\A\S+@.+\.\S+\z/, message: "must be a valid email"}
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6}, on: :create
  validates :description, length: {maximum: 2000}, allow_nil: true
  validates :phone, numericality: {only_integer: true}, allow_blank: true
  validates :phone, length: {is: 10, message: 'must be in 1231231234 format'}, allow_blank: true
  validates_date :date_of_birth, :before => lambda { 18.years.ago }, :before_message => "must be at least 18 years ago."
  # see note below on date_must_be_formatted_correctly. Also if and unless seem to be opposite what they should be.
  validates_date :date_of_birth, :after => lambda {125.years.ago}, :after_message => "suggests that you are dead.", unless: :special_date
  validate :date_must_be_formatted_correctly

  def accepted_events
    @events = []
    applications.where(status: 'approved').map{|application| @events << application.event}
    @events
  end

  def full_name
    first_name + " " + last_name
  end

  def attended_events_count
    applications.where(status: 'approved').count
  end

  def hosted_events_count
    hosted_events.count
  end

# Hacky(clever?) way to get around the fact that I want to use the
# validates_date gem and I don't want my user#create to break if the date is formatted incorrectly
# and I want to return an error if user formats the date incorrectly.
  def date_must_be_formatted_correctly
    if date_of_birth == Date.parse('10-04-0987')
      errors.add(:date_of_birth, "must be formatted correctly.")
    end
  end

  def special_date
    date_of_birth == Date.parse('10-04-0987')
  end



end
