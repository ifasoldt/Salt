class AddUnlimitedGuestsToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :unlimited_guests, :boolean
  end
end
