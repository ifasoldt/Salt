class ConversationsController < ApplicationController

  def index
    respond_to do |format|
      format.html {render :index}
      format.json {render json: current_user.conversations}
    end
  end

  def show
    @conversation = Conversation.find(params[:id])
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @conversation, include: ['messages', 'messages.author', 'message_partner']}
    end
  end
end
