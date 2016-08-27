class Conversation < ApplicationRecord
  has_many :messages
  belongs_to :sender, class_name: 'User'
  belongs_to :recipient, class_name: 'User'
  # see note in messages controller#create
  default_scope { where.not(messages_count: nil).order(created_at: 'DESC')}

  def message_preview
    truncate(messages[0].body, length: 50, omission: '... (continued)')
  end
end
