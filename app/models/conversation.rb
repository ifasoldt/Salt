class Conversation < ApplicationRecord
  has_many :messages
  belongs_to :sender, class_name: 'User'
  belongs_to :recipient, class_name: 'User'
  # see note in messages controller#create
  default_scope { where.not(messages_count: nil).order(created_at: 'DESC')}
end
