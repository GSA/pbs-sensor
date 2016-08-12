class RoomType < ApplicationRecord
  has_many :rooms
  
  def to_s
    name
  end
end
