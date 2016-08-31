class AddApplicationIdToThumbs < ActiveRecord::Migration[5.0]
  def change
    add_column :thumbs, :application_id, :integer
  end
end
