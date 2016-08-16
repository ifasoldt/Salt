class User < ApplicationRecord
  has_secure_password
  has_one :address, as: :addressable, dependent: :destroy
  has_many :hosted_events, class_name: 'Event', foreign_key: 'host_id', dependent: :destroy
  has_many :events, through: :applications
  has_many :applications, dependent: :destroy
  has_many :thumbs
  has_many :host_thumbs, class_name: 'Thumb', foreign_key: 'host_id'


  validates :first_name, :last_name, :email, :date_of_birth, presence: true
  validates :first_name, :last_name, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
  validates :email, format: {with: /\A\S+@.+\.\S+\z/, message: "must be a valid email"}
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6}
  validates :description, length: {maximum: 2000}, allow_nil: true
  validates :phone, numericality: {only_integer: true}, allow_blank: true
  validates :phone, length: {is: 10, message: 'must be in 1231231234 format'}, allow_blank: true
  validates_date :date_of_birth, :before => lambda { 18.years.ago }, :before_message => "must be at least 18 years old"



end
