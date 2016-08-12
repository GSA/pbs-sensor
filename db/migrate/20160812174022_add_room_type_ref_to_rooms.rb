class AddRoomTypeRefToRooms < ActiveRecord::Migration[5.0]
  def change
    add_reference :rooms, :room_type, foreign_key: true
  end
end
