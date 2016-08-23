class ApplicationSerializer < ActiveModel::Serializer
  attributes :id, :message, :quantity, :application_user_name
  belongs_to :user
  belongs_to :event

  def application_user_name
    object.user.full_name
  end

end
