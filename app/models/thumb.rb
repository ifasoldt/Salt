class Thumb < ApplicationRecord
  belongs_to :host, class_name: 'User'
  belongs_to :user
  belongs_to :event
  belongs_to :application
  validates :host_id, :user_id, :application_id, :event_id, presence: true
end
