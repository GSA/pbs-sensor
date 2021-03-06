class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :edit, :update, :destroy]

  # GET /rooms
  # GET /rooms.json
  def index
    min_temperature = (params[:min_temperature] || 0).to_f
    max_temperature = (params[:max_temperature] || 99).to_f
    min_sound = (params[:min_sound] || 0).to_f
    max_sound = (params[:max_sound] || 99).to_f
    min_co2 = (params[:min_co2] || 0).to_f
    max_co2 = (params[:max_co2] || 9999).to_f
    @rooms = Room.where(average_temperature: min_temperature..max_temperature, average_sound: min_sound..max_sound, average_co2: min_co2..max_co2)
  end

  # GET /rooms/1
  # GET /rooms/1.json
  def show
  end

  # GET /rooms/new
  # def new
  #   @room = Room.new
  # end

  # GET /rooms/1/edit
  def edit
  end

  # POST /rooms
  # POST /rooms.json
  def create
    @room = Room.new(room_params)

    respond_to do |format|
      if @room.save
        format.html { redirect_to @room, notice: 'Room was successfully created.' }
        format.json { render :show, status: :created, location: @room }
      else
        format.html { render :new }
        format.json { render json: @room.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /rooms/1
  # PATCH/PUT /rooms/1.json
  def update
    respond_to do |format|
      if @room.update(room_params)
        format.html { redirect_to @room, notice: 'Room was successfully updated.' }
        format.json { render :show, status: :ok, location: @room }
      else
        format.html { render :edit }
        format.json { render json: @room.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /rooms/1
  # DELETE /rooms/1.json
  # def destroy
  #   @room.destroy
  #   respond_to do |format|
  #     format.html { redirect_to rooms_url, notice: 'Room was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_room
      @room = Room.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def room_params
      params.require(:room).permit(:name, :description, :building_id, :room_type_id)
    end
end
