class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true, optional: true
  validates :street, :city, :zip, :state, presence: true
  validates :zip, length: {is: 5}
end
