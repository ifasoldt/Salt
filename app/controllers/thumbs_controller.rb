class ThumbsController < ApplicationController

  def create
    @thumb = Thumb.create(thumb_params)
  end

  def thumb_params
    params.permit(:user_id, :host_id, :event_id, :category)
  end
end
