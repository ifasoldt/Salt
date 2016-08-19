class Address < ApplicationRecord
  include Geokit::Geocoders
  acts_as_mappable
  belongs_to :addressable, polymorphic: true, optional: true
  validates :street, :city, :zip, :state, presence: true
  validates :zip, length: {is: 5}
  validate :is_a_real_address

  def full_address
    "#{street}, #{city}, #{state} #{zip}"
  end

  def is_a_real_address
    loc = Geokit::Geocoders::GoogleGeocoder.geocode(full_address)
    Rails.logger.info loc
    if loc.success
      self.lat = loc.lat
      self.lng = loc.lng
    else
      errors.add(:cannot, "be found.")
    end
  end
end
