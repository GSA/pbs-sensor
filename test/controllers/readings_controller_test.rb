require 'test_helper'

class ReadingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @room = rooms(:one)
    @reading = readings(:one)
  end

  test "should get index" do
    get room_readings_url(room_id: @room)
    assert_response :success
  end

  test "should show reading" do
    get room_reading_url(room_id: @room, id: @reading)
    assert_response :success
  end
end
