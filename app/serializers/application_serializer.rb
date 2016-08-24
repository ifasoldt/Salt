class ApplicationSerializer < ActiveModel::Serializer
  attributes :id, :message, :quantity, :application_user_name, :application_profile_pic, :status, :app_event_id
  belongs_to :user
  belongs_to :event

  def application_user_name
    object.user.full_name
  end

  def application_profile_pic
    Refile.attachment_url(object.user.images.first, :file, :fill, 400, 400) if object.user.images.first
  end

  def app_event_id
    object.event.id
  end
end
