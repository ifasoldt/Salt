class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.references :conversation, foreign_key: true
      t.text :body

      t.timestamps
    end
  end
end
