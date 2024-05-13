class CreateTabs < ActiveRecord::Migration[7.1]
  def change
    create_table :tabs do |t|
      t.string :url
      t.integer :time_spent

      t.timestamps
    end
  end
end
