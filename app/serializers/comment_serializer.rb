class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :formated_created_at, :flagged
  belongs_to :user
  belongs_to :event

  def formated_created_at
    object.created_at.strftime('%b %e at%l:%M %p')
  end
end
