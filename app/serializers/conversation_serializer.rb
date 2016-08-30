class ConversationSerializer < ActiveModel::Serializer
include ActionView::Helpers::TextHelper
attributes :id, :message_preview
has_one :message_partner
has_many :messages


  def message_partner
    ([object.sender, object.recipient] - [current_user]).first
  end

  def message_preview
    truncate(object.most_recent_message.body, length: 90, omission: '... (continued)', escape: false)
  end
end
