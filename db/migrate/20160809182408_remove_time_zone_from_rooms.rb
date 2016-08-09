class RemoveTimeZoneFromRooms < ActiveRecord::Migration[5.0]
  def change
    remove_column :rooms, :time_zone, :string
  end
end
