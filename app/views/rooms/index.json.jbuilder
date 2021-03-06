json.array!(@rooms) do |room|
  json.extract! room, :id, :name, :description, :average_temperature, :average_sound, :average_co2, :building, :room_type
  json.url room_url(room, format: :json)
end
