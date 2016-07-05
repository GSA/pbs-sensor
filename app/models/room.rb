class Room < ApplicationRecord
  has_many :readings

  def update_averages
    self.update(average_temperature: readings.compact.collect { |r| r.temperature.to_f }.sum / readings.compact.count) if readings.compact.any?
  end
end
