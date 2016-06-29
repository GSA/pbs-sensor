json.array!(@readings) do |reading|
  json.extract! reading, :id, :room_id, :recorded_at, :temperature
  json.url reading_url(reading, format: :json)
end
