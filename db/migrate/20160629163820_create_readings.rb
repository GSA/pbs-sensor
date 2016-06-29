class CreateReadings < ActiveRecord::Migration[5.0]
  def change
    create_table :readings do |t|
      t.references :room, foreign_key: true
      t.datetime :recorded_at
      t.float :temperature

      t.timestamps
    end
  end
end
