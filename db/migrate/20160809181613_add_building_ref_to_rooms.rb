class AddBuildingRefToRooms < ActiveRecord::Migration[5.0]
  def change
    add_reference :rooms, :building, foreign_key: true
  end
end
