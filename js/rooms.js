var originalRoomData = [];
var filteredRoomData = [];
var roomTable;

function updateTemperatureRange(min, max) {
  $("#temperature-range").val(min + " - " + max);
  filteredRoomData = originalRoomData.filter(function (room) {
    return (room.temperature >= min && room.temperature <= max);
  });
  updateTable(filteredRoomData);
}

function updateTable(roomData) {
  $("#room-list").DataTable({
    data: roomData,
    destroy: true,
    searching: false,
    lengthChange: false,
    pageLength: 20,
    columns: [
      {
        data: "number",
        render: function (data) {
          return '<a href="room.html">' + data + '</a>';
        }
      },
      { data: "temperature" }
    ]
  });
}

$(document).ready(function () {
  $.get("js/roomData.json", function (data, status) {
    originalRoomData = data;
    updateTable(originalRoomData);
    updateTemperatureRange($("#slider-temperature-range").slider("values", 0), $("#slider-temperature-range").slider("values", 1));
  });

  $("#slider-temperature-range").slider({
    range: true,
    min: 60,
    max: 80,
    values: [ 68, 72 ],
    slide: function (event, ui) {
      updateTemperatureRange(ui.values[0], ui.values[1]);
    }
  });
});
