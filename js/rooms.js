var Room = Backbone.Model.extend({
  defaults: {
    number: 0,
    temperature: 0
  }
});

var RoomList = Backbone.Collection.extend({
  model: Room,
  comparator: "number",
  temperatureRange: function(min, max) {
    /* TODO: Make temperatureRange chainable by returning a Collection */
    return this.filter(function (room) {
      var temperature = room.get("temperature");
      return (temperature >= min && temperature <= max);
    });
  }
});

var rooms = new RoomList();

var columns = [{
  name: "number",
  label: "Room Number",
  editable: false,
  sortable: false,
  cell: "string"
}, {
  name: "temperature",
  label: "Temperature",
  editable: false,
  sortable: false,
  cell: "integer"
}];

function updateTemperatureRange(min, max) {
  $("#temperature-range").val(min + " - " + max);
  var roomGrid = new Backgrid.Grid({
    columns: columns,
    emptyText: "No rooms match your preferences.",
    className: "table table-striped",
    collection: rooms.temperatureRange(min, max)
  });
  $("#room-list").html(roomGrid.render().el);
}

$(document).ready(function () {
  $("#slider-temperature-range").slider({
    range: true,
    min: 60,
    max: 80,
    values: [ 68, 72 ],
    slide: function (event, ui) {
      updateTemperatureRange(ui.values[0], ui.values[1]);
    }
  });

  rooms.fetch({
    url: "js/roomData.json",
    success: function () {
      updateTemperatureRange($("#slider-temperature-range").slider("values", 0), $("#slider-temperature-range").slider("values", 1));
    },
    error: function () {
      console.log("load fail");
    }
  });

  updateTemperatureRange($("#slider-temperature-range").slider("values", 0), $("#slider-temperature-range").slider("values", 1));
});
