class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :formatted_created_at, :flagged
  belongs_to :user
  belongs_to :event

  def formatted_created_at
    object.created_at.strftime('%A, %b %d. @ %l:%M %P')
  end
end
