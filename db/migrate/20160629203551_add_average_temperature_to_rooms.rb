class AddAverageTemperatureToRooms < ActiveRecord::Migration[5.0]
  def change
    add_column :rooms, :average_temperature, :float
  end
end
