PBS.rooms = PBS.rooms || {};

PBS.rooms.index = function () {
  var FILTER_AJAX_DELAY = 500; // Milliseconds to wait for more filter input before sending an Ajax request

  var timer = null;
  var temperatureUnits = "C"; // Later: set based on user profile

  /*
   * Fetches filtered data via ajax. Loads the data into the room list table.
   */
  function loadData() {
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
            responsivePriority: 1,
            render: function (data, type, full, meta) {
              return '<a href="/rooms/' + full.id + '">' + data + '</a>';
            }
          },
          {
            targets: [COL_DESCRIPTION],
            responsivePriority: 4
          },
          {
            targets: [COL_TIME_ZONE],
            responsivePriority: 3
          },
          {
            targets: [COL_AVERAGE_TEMPERATURE],
            responsivePriority: 2,
            render: $.fn.dataTable.render.number(',', '.', '2', '', ' &deg;' + temperatureUnits)
          }
        ]
      });
    });
  };

  /*
   * Event handler for when any search filters are updated. Ensures the server is not flooded with ajax requests.
   */
  function updateFilters() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(loadData, FILTER_AJAX_DELAY);
  };

  $(document).ready(function () {
    // Set filter defaults (Later: set defaults via user profile)
    var filterTemperatureMin = 20;
    var filterTemperatureMax = 22;

    // Apply initial filters to the input fields
    $("#filter-temp-min").val(filterTemperatureMin);
    $("#filter-temp-max").val(filterTemperatureMax);

    loadData();

    $("#filter-temp-min, #filter-temp-max").keyup(function () {
      updateFilters();
    });

    $("#slider-temperature-range").slider({
      range: true,
      min: 15,
      max: 30,
      values: [filterTemperatureMin, filterTemperatureMax],
      slide: function (event, ui) {
        $("#filter-temp-min").val(ui.values[0]);
        $("#filter-temp-max").val(ui.values[1]);
        updateFilters();
      }
    });
  });
}
