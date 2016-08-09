class CreateBuildings < ActiveRecord::Migration[5.0]
  def change
    create_table :buildings do |t|
      t.string :name
      t.string :time_zone

      t.timestamps
    end
  end
end
