class CreateRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :rooms do |t|
      t.string :name
      t.string :code, null: false
      t.string :description
      t.string :time_zone, default: "UTC"

      t.timestamps
    end
  end
end
