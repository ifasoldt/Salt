class Application < ApplicationRecord
  belongs_to :user
  belongs_to :event
  validates :quantity, presence: true
  validates :message, length: {maximum: 1000}, allow_blank: true
end
