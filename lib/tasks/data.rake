require 'csv'

namespace :data do
  desc "Imports sensor data into the application"
  task import: :environment do
    # Create dummy tasks for each arg because rake will automatically try to run each arg as a task
    ARGV.each { |a| task a.to_sym do ; end }

    # Validate command line arguments
    valid_sensor_types = [:temperature, :sound, :co2]
    unless ARGV.count > 2
      puts "Usage: rake data:import SENSOR_TYPE FILENAME"
      exit 1
    end
    sensor_type = ARGV[1].to_sym
    filename = ARGV[2]
    unless valid_sensor_types.include? sensor_type
      puts "Sensor type must be one of:"
      valid_sensor_types.each { |t| puts "  #{t.to_s}" }
      exit 1
    end
    unless File.exists? filename
      puts "File not found: #{filename}"
      exit 1
    end

    # Verify that the rooms specified in the data file exist
    puts "Verifying rooms..."
    invalid_rooms = []
    CSV.open(filename, "r") do |csv|
      count = 0
      existing_rooms = Room.all.collect { |r| r.code }
      csv.each do |row|
        count += 1
        room_code = row.first
        unless existing_rooms.include? room_code
          invalid_rooms.push(room_code) unless invalid_rooms.include? room_code
        end
        print "." if count % 1000 == 0
        print count if count % 10000 == 0
      end
      puts
    end
    unless invalid_rooms.empty?
      puts "The following room codes need to be added to the system before you can import data for them:"
      invalid_rooms.each { |r| puts "  #{r}" }
      exit 1
    end
    puts "Verified rooms, loading data..."

    # Import the data
    CSV.open(filename, "r") do |csv|
      count = 0
      room_cache = []
      csv.each do |row|
        count += 1
        room_code, timestamp, value = row
        room_cache_index = room_cache.find_index { |room| room.code == room_code }
        room = nil
        if room_cache_index.nil?
          room = Room.where(code: room_code).take
          room_cache.push(room)
        else
          room = room_cache[room_cache_index]
        end
        Time.zone = room.time_zone
        record_time = Time.zone.parse(timestamp).to_datetime
        reading = Reading.where(room: room, recorded_at: record_time).take
        if reading.nil?
          reading = Reading.new(room: room, recorded_at: record_time)
        end
        if sensor_type == :temperature
          reading.temperature = value
        end
        if sensor_type == :sound
          reading.sound = value
        end
        if sensor_type == :co2
          reading.co2 = value
        end
        reading.save
        print "." if count % 1000 == 0
        print count if count % 10000 == 0
      end
      puts
    end
    puts "Loaded data"

    Room.all.each { |room| room.update_averages }
  end
end
