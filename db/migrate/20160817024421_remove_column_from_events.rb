class RemoveColumnFromEvents < ActiveRecord::Migration[5.0]
  def change
    remove_column :events, :drink
  end
end
