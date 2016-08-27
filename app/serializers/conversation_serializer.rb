class ConversationSerializer < ActiveModel::Serializer
attributes :id
has_one :message_partner
has_many :messages


  def message_partner
    ([object.sender, object.recipient] - [current_user]).first
  end
end
