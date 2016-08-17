class Application < ApplicationRecord
  belongs_to :user
  belongs_to :event
  validates :quantity, presence: true
  validates :quantity, numericality: {only_integer: true, message: 'of guests must be specified'}
  validates :message, length: {maximum: 1000}, allow_blank: true
  validate :event_has_enough_spots_left

  def event_has_enough_spots_left
    unless event.spots_left.is_a?(String)
      if event.spots_left < quantity.to_i
        errors.add(:event, "doesn't have enough spots left")
      end
    end
  end
end
