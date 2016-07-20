class Room < ApplicationRecord
  has_many :readings

  def update_averages
    valid_readings = readings.compact
    self.update(
      average_temperature: valid_readings.collect { |r| r.temperature.to_f }.sum / valid_readings.count,
      average_sound: valid_readings.collect { |r| r.sound.to_f }.sum / valid_readings.count,
      average_co2: valid_readings.collect { |r| r.co2.to_f }.sum / valid_readings.count
    ) if valid_readings.any?
  end
end
