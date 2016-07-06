class AddSoundModality < ActiveRecord::Migration[5.0]
  def change
    add_column :rooms, :average_sound, :float
    add_column :readings, :sound, :float
  end
end
