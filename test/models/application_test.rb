require 'test_helper'

class ApplicationTest < ActiveSupport::TestCase
  should belong_to(:user)
  should belong_to(:event)
  should allow_value('').for(:message)
  should allow_value(nil).for(:message)
  should allow_value('New Fun Time!' * 2).for(:message)
  should_not allow_value('Isaiah is fun!' * 100).for(:message)
  should validate_presence_of(:quantity)
end
