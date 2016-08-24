class CommentsController < ApplicationController
  before_action :require_user

  def create
    @event = Event.find(params[:event_id])
    @comment = @event.comments.new(comment_params.merge(user_id: current_user.id))
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy
  end


  private

  def comment_params
    params.permit(:body, :flagged)
  end
end
