class Application < ApplicationRecord
  belongs_to :user
  belongs_to :event
  has_one :thumb
  validates :quantity, presence: true
  validates :quantity, numericality: {only_integer: true, message: 'must be a number'}
  validates :message, length: {maximum: 160}, allow_blank: true
  validate :event_has_enough_spots_left, if: :event
  default_scope { order(created_at: 'DESC') }

#breaking my model tests why?
  def event_has_enough_spots_left
    unless event.spots_left.is_a?(String)
      if event.spots_left < quantity.to_i
        errors.add(:event, "doesn't have enough spots left")
      end
    end
  end
  #
  # def application_expires
  #   if event.
  #   end
  # end

end
