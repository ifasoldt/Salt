class MessageSerializer < ActiveModel::Serializer
attributes :id, :body, :created_at
belongs_to :conversation
belongs_to :author, class_name: 'User'


  def created_at
    object.created_at.strftime("%A, %b %d. @ %l:%M %P")
  end
end
