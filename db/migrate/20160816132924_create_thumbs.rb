class CreateThumbs < ActiveRecord::Migration[5.0]
  def change
    create_table :thumbs do |t|
      t.integer :host_id
      t.integer :user_id
      t.integer :event_id
      t.string :categery

      t.timestamps
    end
  end
end
