class Message < ApplicationRecord
  belongs_to :conversation, counter_cache: true, touch: true
  belongs_to :author, class_name: 'User'
  default_scope { order(created_at: 'DESC') }
end
