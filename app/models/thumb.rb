class Thumb < ApplicationRecord
  belongs_to :host, class_name: 'User'
  belongs_to :user
  belongs_to :event
  belongs_to :application

end
