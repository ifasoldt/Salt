class ConversationsController < ApplicationController

  def index
    current_user.conversations
  end
end
