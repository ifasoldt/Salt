class AddFlaggedToComment < ActiveRecord::Migration[5.0]
  def change
    add_column :comments, :flagged, :boolean
  end
end
