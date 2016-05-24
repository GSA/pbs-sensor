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

var rooms = new RoomList([
  new Room({ number: 1001, temperature: 68 }),
  new Room({ number: 1002, temperature: 73 }),
  new Room({ number: 1003, temperature: 70 }),
  new Room({ number: 1004, temperature: 67 }),
  new Room({ number: 1005, temperature: 69 }),
  new Room({ number: 1006, temperature: 72 })
]);

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

  updateTemperatureRange($("#slider-temperature-range").slider("values", 0), $("#slider-temperature-range").slider("values", 1));
});
