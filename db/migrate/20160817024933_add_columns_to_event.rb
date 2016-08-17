class AddColumnsToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :title, :string
    add_column :events, :allow_children, :boolean
    add_column :events, :serving_alcohol, :boolean
  end
end
