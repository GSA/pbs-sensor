class Building < ApplicationRecord
  has_many :rooms

  def to_s
    name
  end
end
