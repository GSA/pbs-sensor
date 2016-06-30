json.array!(@rooms) do |room|
  json.extract! room, :id, :name, :description, :time_zone, :average_temperature
  json.url room_url(room, format: :json)
end
