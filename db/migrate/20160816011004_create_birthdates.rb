class CreateBirthdates < ActiveRecord::Migration[5.0]
  def change
    create_table :birthdates do |t|
      t.integer :user_id
      t.integer :year
      t.integer :month
      t.integer :day

      t.timestamps
    end
  end
end
