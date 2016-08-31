class ThumbsController < ApplicationController

  def create
    @thumb = Thumb.find_or_create_by(event_id: params[:event_id], host_id: current_user.id, user_id: params[:user_id])
    @thumb.update(category: params[:category])
    render json: @thumb
  end

  private

  def thumb_params
    params.permit(:user_id, :host_id, :event_id, :category)
  end
end
