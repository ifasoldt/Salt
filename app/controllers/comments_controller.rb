class CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    
  end

  def update
  end

  def destroy
  end


  private

  def comment_params
    params.permit(:body)
  end
end
