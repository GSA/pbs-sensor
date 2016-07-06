class AddCarbonDioxideModality < ActiveRecord::Migration[5.0]
  def change
    add_column :rooms, :average_co2, :float
    add_column :readings, :co2, :float
  end
end
