class CreateEvents < ActiveRecord::Migration[5.0]
  def change
    create_table :events do |t|
      t.integer :host_id
      t.text :description
      t.text :food
      t.text :drink
      t.integer :guest_limit
      t.datetime :time

      t.timestamps
    end
  end
end
