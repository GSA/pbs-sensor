json.array!(@rooms) do |room|
  json.extract! room, :id, :name, :description, :time_zone
  json.url room_url(room, format: :json)
end
