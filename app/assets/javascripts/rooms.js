PBS.rooms = PBS.rooms || {};

PBS.rooms.index = function () {
  var FILTER_AJAX_DELAY = 500; // Milliseconds to wait for more filter input before sending an Ajax request

  var timer = null;
  var temperatureUnits = "F"; // Later: set based on user profile

  function toFahrenheit(temperature) {
    return temperature * 9.0/5.0 + 32;
  }

  function toCelsius(temperature) {
    return (temperature - 32) * 5.0/9.0;
  }

  /*
   * Returns the min or max data value of the given modality filter option.
   */
  function getRadioFilterOption(modality, minMax) {
    return $("input[name=filter-" + modality + "]:checked").data(minMax);
  }

  /*
   * Returns a string representing the user's range selection for a modality.
   */
  function getFilterRanges(modality) {
    var ranges = "";
    $("input[name=filter-" + modality + "]:checked").each(function () {
      ranges += $(this).data("min") + "-" + $(this).data("max") + ",";
    });
    return ranges;
  }

  /*
   * Fetches filtered data via ajax. Loads the data into the room list table.
   */
  function loadData() {
    // DataTables column numbers
    var COL_ROOM_NUMBER = 0;
    var COL_DESCRIPTION = 1;
    var COL_TIME_ZONE = 2;
    var COL_AVERAGE_TEMPERATURE = 3;
    var COL_AVERAGE_SOUND = 4;
    var COL_AVERAGE_CO2 = 5;

    var filter_params = {
      min_temperature: toCelsius(parseFloat($("#filter-temp-min").val())),
      max_temperature: toCelsius(parseFloat($("#filter-temp-max").val())),
      sound_ranges: getFilterRanges("sound"),
      co2_ranges: getFilterRanges("co2")
    };

    $.get("/rooms.json", filter_params, function (data, status) {
      $("#room-list").dataTable({
        data: data,
        destroy: true,
        columns: [
          { data: "name" },
          { data: "description" },
          { data: "time_zone" },
          { data: "average_temperature" },
          { data: "average_sound" },
          { data: "average_co2" }
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
            render: function (data, type, full, meta) {
              var f = toFahrenheit(data);
              return f.toFixed(2) + ' &deg;F';
            }
          },
          {
            targets: [COL_AVERAGE_SOUND],
            responsivePriority: 2,
            render: $.fn.dataTable.render.number(',', '.', '2', '', ' dBm')
          },
          {
            targets: [COL_AVERAGE_CO2],
            responsivePriority: 2,
            render: $.fn.dataTable.render.number(',', '.', '2', '', ' ppm')
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
    var filterTemperatureMin = 67;
    var filterTemperatureMax = 73;
    var filterSoundIndexes = [0, 1];
    var filterCO2Indexes = [0, 1];

    // Apply initial filters to the input fields
    $("#filter-temp-min").val(filterTemperatureMin);
    $("#filter-temp-max").val(filterTemperatureMax);
    filterSoundIndexes.forEach(function (element, index, array) {
      $("input[name=filter-sound][data-index=" + element + "]").parent().click();
    });
    filterCO2Indexes.forEach(function (element, index, array) {
      $("input[name=filter-co2][data-index=" + element + "]").parent().click();
    });

    loadData();

    // Perform live updates as the user adjusts filter values
    $(".filter-button input").change(function () {
      updateFilters();
    });
    $(".filter-slider-value").keyup(function () {
      updateFilters();
    });

    // Update the sliders to reflect manual entry in the filter input fields
    $(".filter-slider-value").change(function () {
      $(".filter-slider").each(function () {
        var $filterMinInput = $("#" + $(this).data("min-input-id"));
        var $filterMaxInput = $("#" + $(this).data("max-input-id"));
        $(this).slider("values", 0, $filterMinInput.val());
        $(this).slider("values", 1, $filterMaxInput.val());
      });
    });

    // Initialize each slider using its data-* attributes
    $(".filter-slider").each(function () {
      var $filterMinInput = $("#" + $(this).data("min-input-id"));
      var $filterMaxInput = $("#" + $(this).data("max-input-id"));
      $(this).slider({
        range: true,
        min: $(this).data("min"),
        max: $(this).data("max"),
        values: [$filterMinInput.val(), $filterMaxInput.val()],
        slide: function (event, ui) {
          $filterMinInput.val(ui.values[0]);
          $filterMaxInput.val(ui.values[1]);
          updateFilters();
        }
      });
    });
  });
}
