class Address < ApplicationRecord
  include Geokit::Geocoders
  acts_as_mappable auto_geocode: {field: :full_address, error_message: 'could not be found'}
  belongs_to :addressable, polymorphic: true, optional: true
  validates :street, :city, :zip, :state, presence: true
  validates :zip, length: {is: 5}
  scope :close_events, -> (event) { within(20, :origin => event)}
  # validate :is_a_real_address

  def full_address
    "#{street}, #{city}, #{state} #{zip}"
  end

  # def is_a_real_address
  #   loc = Geokit::Geocoders::GoogleGeocoder.geocode(full_address)
  #   unless loc.success
  #     errors.add(:cannot, "be found.")
  #   end
  # end
end
