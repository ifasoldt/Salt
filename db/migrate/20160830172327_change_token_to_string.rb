class ChangeTokenToString < ActiveRecord::Migration[5.0]
  def change
    remove_column :password_recoveries, :token
    add_column :password_recoveries, :token, :string
  end
end
