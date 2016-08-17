class AddEventFiltered < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :filter_guests, :boolean
  end
end
