class ChangeThumbsCategory < ActiveRecord::Migration[5.0]
  def change
    rename_column :thumbs, :categery, :category
  end
end
