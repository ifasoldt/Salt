class Message < ApplicationRecord
  belongs_to :conversation, counter_cache: true
end
