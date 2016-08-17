class ThumbsController < ApplicationController

  def create
    @thumb = Thumb.create(thumb_params)
    render json: @thumb
  end

  def update
    @thumb = Thumb.find(params[:id])
    @thumb.update(thumb_params)
    render json: @thumb
  end

  private

  def thumb_params
    params.permit(:user_id, :host_id, :event_id, :category)
  end
end
