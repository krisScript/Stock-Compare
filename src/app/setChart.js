const setChart = (type, labels, data, colors) => {
  const chart = document.querySelector('#stocks-chart').getContext('2d');
  const myChart = new Chart(chart, {
    type,
    data: {
      labels: [...labels],
      datasets: [
        {
          label: 'Latest Stock Price',
          data: [...data],
          backgroundColor: [...colors],
          borderWidth: 1
        }
      ]
    },
    options: {
      animation: {
        duration: 0
      },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
  return myChart;
};
export default setChart;
