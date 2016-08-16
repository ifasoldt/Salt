require 'test_helper'

class UserTest < ActiveSupport::TestCase
  should have_secure_password
  should have_one(:address)
  should have_many(:hosted_events).class_name('Event').with_foreign_key('host_id')
  should have_many(:events)
  should have_many(:applications)
  should have_many(:thumbs)
  should have_many(:host_thumbs).class_name('Thumb').with_foreign_key('host_id')

  should validate_presence_of(:first_name)
  should validate_presence_of(:last_name)
  should validate_presence_of(:email)
  should validate_presence_of(:date_of_birth)
  should allow_value('ifasoldt@gmail.com').for(:email)
  should_not allow_value('@gmail.com').for(:email)
  should_not allow_value('Isiah@gmail').for(:email)
  should_not allow_value('').for(:email)
  should allow_value('isaiah').for(:first_name)
  should allow_value('ISAIAH').for(:first_name)
  should_not allow_value('Isaiah0').for(:first_name)
  should_not allow_value('Isaiah.Fasoldt').for(:first_name)
  should_not allow_value('isaiah-fasoldt').for(:first_name)
  should allow_value('isaiah').for(:last_name)
  should allow_value('ISAIAH').for(:last_name)
  should_not allow_value('Isaiah0').for(:last_name)
  should_not allow_value('Isaiah.Fasoldt').for(:last_name)
  should_not allow_value('isaiah-fasoldt').for(:last_name)
  should allow_value('facebook').for(:password)
  should_not allow_value('faceb').for(:password)
  should allow_value('').for(:description)
  should allow_value('asdfasdf').for(:description)
  should_not allow_value('Isaiah' * 400).for(:description)
  should allow_value('').for(:phone)
  should allow_value('9998887766').for(:phone)
  should_not allow_value('999888').for(:phone)
  should_not allow_value('999888777z').for(:phone)
  should allow_value(Date.parse('12-08-1988')).for(:date_of_birth)
  should_not allow_value(Date.parse('12-08-1999')).for(:date_of_birth)
end
