class AddMessagesCountToConversation < ActiveRecord::Migration[5.0]
  def change
    add_column :conversations, :messages_count, :integer
  end
end
