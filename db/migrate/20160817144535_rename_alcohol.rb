class RenameAlcohol < ActiveRecord::Migration[5.0]
  def change
    rename_column :events, :serving_alcohol, :alcohol_allowed
  end
end
