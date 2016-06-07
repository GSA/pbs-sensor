var roomsByTemperatureCtx = document.getElementById("stats-rooms-by-temperature");
var roomsByTemperatureChart = new Chart(roomsByTemperatureCtx, {
  type: "bar",
  data: {
    labels: ["66", "67", "68", "69", "70", "71", "72", "73", "74"],
    datasets: [{
      label: "Rooms",
      data: [0, 1, 1, 2, 4, 4, 5, 2, 1],
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1
        }
      }]
    }
  }
});
