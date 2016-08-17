class Application < ApplicationRecord
  belongs_to :user
  belongs_to :event
  validates :quantity, presence: true
  validates :quantity, numericality: {only_integer: true, message: 'of guests must be specified'}
  validates :message, length: {maximum: 1000}, allow_blank: true
end
