class RenameImageToFile < ActiveRecord::Migration[5.0]
  def change
    rename_column :images, :image_id, :file_id
  end
end
