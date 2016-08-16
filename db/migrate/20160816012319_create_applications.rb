class CreateApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :applications do |t|
      t.integer :user_id
      t.integer :event_id
      t.integer :quantity
      t.text :message

      t.timestamps
    end
  end
end
