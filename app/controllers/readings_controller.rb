class ReadingsController < ApplicationController
  # GET /rooms/1/readings
  # GET /rooms/1/readings.json
  def index
    @room = Room.find(params[:room_id])
    @readings = Reading.where(room: @room)
  end

  # GET /rooms/1/readings/1
  # GET /rooms/1/readings/1.json
  def show
    @room = Room.find(params[:room_id])
    @reading = Reading.find(params[:id])
  end
end
