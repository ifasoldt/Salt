require 'test_helper'

class EventTest < ActiveSupport::TestCase
  should have_many(:users)
  should belong_to(:host).class_name('User')
  should have_many(:applications)
  should have_one(:address)
  should have_many(:thumbs)
  should validate_presence_of(:description)
  should validate_presence_of(:food)
  should validate_presence_of(:time)
  should allow_value('This is going to be a great event; Indeed, what an event!').for(:description)
  should_not allow_value('This is going to be a great event; Indeed, what an event!' * 50).for(:description)
  should_not allow_value(1).for(:guest_limit)
  should allow_value(2).for(:guest_limit)
end
