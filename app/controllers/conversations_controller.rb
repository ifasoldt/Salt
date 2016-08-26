class ConversationsController < ApplicationController

  def index
    render json: current_user.conversations
  end

  def show
  end
end
