class ConversationsController < ApplicationController

  def index
    respond_to do |format|
      format.html {render :index}
      format.json {render json: current_user.conversations}
    end
  end

  def show
    @conversation = Conversation.find(params[:id])
    render json: @conversation
  end
end
