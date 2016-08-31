class ApplicationSerializer < ActiveModel::Serializer
  attributes :id, :message, :quantity, :application_user_name, :application_profile_pic, :status, :app_event_id, :user_thumbs_up, :user_thumbs_down, :app_user_id, :thumb_status

  belongs_to :user
  belongs_to :event

  def application_user_name
    object.user.full_name
  end

  def application_profile_pic
    if object.user.images.first
      Refile.attachment_url(object.user.images.first, :file, :fill, 400, 400) if object.user.images.first
    else
      "/assets/no_pic.png"
    end
  end

  def thumb_status
    object.thumb&.category
  end

  def user_thumbs_up
    object.user.thumbs.where(category: 'up')
  end

  def user_thumbs_down
    object.user.thumbs.where(category: 'down')
  end

  def app_event_id
    object.event.id
  end

  def app_user_id
    object.user.id
  end
end
