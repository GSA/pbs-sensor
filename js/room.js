var roomTemperatureCtx = document.getElementById("room-temperature-histogram");
var roomTemperatureChart = new Chart(roomTemperatureCtx, {
  type: "bar",
  data: {
    labels: ["1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm"],
    datasets: [{
      label: "Temperature",
      data: [72, 73, 73, 72, 72, 71, 72, 73, 73, 73, 72, 71, 70, 69, 68, 66, 66, 67, 68, 69, 69, 70, 71, 71]
    }]
  },
  options: {
    scales: {
      xAxes: [{
        categoryPercentage: 1.0,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        ticks: {
          min: 60,
          stepSize: 2
        }
      }]
    }
  }
});
