class MessagesController < ApplicationController

  def create
    # I have to check for conversations where the recipient is the current sender and the sender is the current recipient.
    # I also had to create a default scope because the below code can create conversations without messages and I don't want them rendered.
    # But I want to find them right here.
    @conversation = Conversation.unscoped.find_by(sender_id: params[:recipient_id], recipient_id: current_user.id)
    unless @conversation
      @conversation = Conversation.unscoped.find_or_create_by(sender_id: current_user.id], recipient_id: params[:recipient_id])
    end
    @message = @conversation.messages.new(message_params)
    if @message.save
      render json: @message
    else
      render json: @message.errors.full_messages
    end
  end

  private

  def message_params
    params.permit(:body)
  end
end
