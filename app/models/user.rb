class User < ApplicationRecord
  has_secure_password
  has_one :address, as: :addressable, dependent: :destroy
  # doesn't validate presence of address if all_blank
  accepts_nested_attributes_for :address, reject_if: :all_blank
  has_many :hosted_events, class_name: 'Event', foreign_key: 'host_id', dependent: :destroy
  # has_many :conversations, ->(user){ where("conversations.sender_id = :user_id OR conversations.recipient_id = :user_id", user_id: user.id) }
  has_many :events, through: :applications
  has_many :comments
  has_many :applications, dependent: :destroy
  has_many :thumbs
  has_many :host_thumbs, class_name: 'Thumb', foreign_key: 'host_id'
  has_many :images, as: :imageable, dependent: :destroy
  accepts_attachments_for :images


  validates :first_name, :last_name, :email, :date_of_birth, presence: true
  validates :first_name, :last_name, format: { with: /([ \u00c0-\u01ffa-zA-Z'\-])+/, message: "only allows letters" }
  validates :email, format: {with: /\A\S+@.+\.\S+\z/, message: "must be a valid email"}
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6}, on: :create
  validates :description, length: {maximum: 2000}, allow_nil: true
  validates :phone, format: {with: /\A\d{3}-\d{3}-\d{4}\z/}, allow_blank: true
  validates :phone, length: {is: 12, message: 'must be in 123-123-1234 format'}, allow_blank: true
  validates_date :date_of_birth, :before => lambda { 18.years.ago }, :before_message => "must be at least 18 years ago."
  # see note below on date_must_be_formatted_correctly. Also if and unless seem to be opposite what they should be.
  validates_date :date_of_birth, :after => lambda {125.years.ago}, :after_message => "suggests that you are dead.", unless: :special_date
  validate :date_must_be_formatted_correctly

  def accepted_events
    @events = []
    applications.where(status: 'approved').map{|application| @events << application.event}
    @events
  end

  def conversations
    Conversation.where("sender_id = ? OR recipient_id = ?", self.id, self.id)
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
