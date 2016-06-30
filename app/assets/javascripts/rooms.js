var PBS = PBS || {};
PBS.roomFinder = PBS.roomFinder || {};

PBS.roomFinder.timer = null;
PBS.roomFinder.filterAjaxDelay = 500; // Milliseconds to wait for more filter input before sending an Ajax request
PBS.roomFinder.temperatureUnits = "C";

/*
 * Fetches filtered data via ajax. Loads the data into the room list table.
 */
PBS.roomFinder.loadData = function () {
  // DataTables column numbers
  var COL_ROOM_NUMBER = 0;
  var COL_DESCRIPTION = 1;
  var COL_TIME_ZONE = 2;
  var COL_AVERAGE_TEMPERATURE = 3;

  var filter_params = {
    min_temperature: parseFloat($("#filter-temp-min").val()),
    max_temperature: parseFloat($("#filter-temp-max").val())
  };

  $.get("/rooms.json", filter_params, function (data, status) {
    $("#room-list").dataTable({
      data: data,
      destroy: true,
      columns: [
        { data: "name" },
        { data: "description" },
        { data: "time_zone" },
        { data: "average_temperature" }
      ],
      columnDefs: [
        {
          targets: [COL_ROOM_NUMBER],
          render: function (data, type, full, meta) {
            return '<a href="/rooms/' + full.id + '">' + data + '</a>';
          }
        },
        {
          targets: [COL_AVERAGE_TEMPERATURE],
          render: $.fn.dataTable.render.number(',', '.', '2', '', ' &deg;' + PBS.roomFinder.temperatureUnits)
        }
      ]
    });
  });
};

/*
 * Event handler for when any search filters are updated. Ensures the server is not flooded with ajax requests.
 */
PBS.roomFinder.updateFilters = function () {
  if (PBS.roomFinder.timer) {
    clearTimeout(PBS.roomFinder.timer);
  }
  PBS.roomFinder.timer = setTimeout(PBS.roomFinder.loadData, PBS.roomFinder.filterAjaxDelay);
};

$(document).ready(function () {
  // Set filter defaults
  var filterTemperatureMin = 20;
  var filterTemperatureMax = 22;

  // Apply initial filters
  $("#filter-temp-min").val(filterTemperatureMin);
  $("#filter-temp-max").val(filterTemperatureMax);

  PBS.roomFinder.loadData();

  $("#filter-temp-min, #filter-temp-max").keyup(function () {
    PBS.roomFinder.updateFilters();
  });

  $("#slider-temperature-range").slider({
    range: true,
    min: 15,
    max: 30,
    values: [filterTemperatureMin, filterTemperatureMax],
    slide: function (event, ui) {
      $("#filter-temp-min").val(ui.values[0]);
      $("#filter-temp-max").val(ui.values[1]);
      PBS.roomFinder.updateFilters();
    }
  });
});
