require 'test_helper'

class ThumbTest < ActiveSupport::TestCase
  should belong_to(:host).class_name('User')
  should belong_to(:user)
  should belong_to(:event)
end
