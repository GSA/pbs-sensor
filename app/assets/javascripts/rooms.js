var PBS = PBS || {};
PBS.roomFinder = PBS.roomFinder || {};

PBS.roomFinder.originalRoomData = [];
PBS.roomFinder.filteredRoomData = [];
PBS.roomFinder.roomTable;

PBS.roomFinder.updateTemperatureRange = function (min, max) {
  $("#temperature-range").val(min + " - " + max);
  PBS.roomFinder.filteredRoomData = PBS.roomFinder.originalRoomData.filter(function (room) {
    return (room.temperature >= min && room.temperature <= max);
  });
  PBS.roomFinder.filteredRoomData = PBS.roomFinder.originalRoomData;
  PBS.roomFinder.updateTable(PBS.roomFinder.filteredRoomData);
};

PBS.roomFinder.updateTable = function () {
  $("#room-list").dataTable({
    ajax: {
      url: "/rooms.json",
      dataSrc: ""
    },
    // data: roomData,
    destroy: true,
    searching: false,
    lengthChange: false,
    pageLength: 20,
    columns: [
      { data: "name" },
      { data: "description" }
    ]
  });
};

$(document).ready(function () {
  // $.get("/rooms.json", function (data, status) {
  //   PBS.roomFinder.originalRoomData = data;
  //   PBS.roomFinder.updateTable(PBS.roomFinder.originalRoomData);
  //   PBS.roomFinder.updateTemperatureRange($("#slider-temperature-range").slider("values", 0), $("#slider-temperature-range").slider("values", 1));
  // });

  PBS.roomFinder.updateTable();

  $("#slider-temperature-range").slider({
    range: true,
    min: 60,
    max: 80,
    values: [ 68, 72 ],
    slide: function (event, ui) {
      PBS.roomFinder.updateTemperatureRange(ui.values[0], ui.values[1]);
    }
  });
});
