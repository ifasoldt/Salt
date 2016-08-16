require 'test_helper'

class AddressTest < ActiveSupport::TestCase
  should belong_to(:addressable)
  should allow_value('11442').for(:zip)
  should_not allow_value('12').for(:zip)
  should validate_presence_of(:zip)
  should validate_presence_of(:street)
  should validate_presence_of(:city)
  should validate_presence_of(:state)
end
