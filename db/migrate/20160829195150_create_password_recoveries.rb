class CreatePasswordRecoveries < ActiveRecord::Migration[5.0]
  def change
    create_table :password_recoveries do |t|
      t.integer :token

      t.timestamps
    end
  end
end
