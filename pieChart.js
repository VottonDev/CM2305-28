let ctx = document.getElementById('myChart').getContext('2d');
let labels = ['Xbox ', 'ps4'];
let colorHex = ['#FB3640', '#EFCA08', '#43AA8B', '#253D5B'];
/* exported myChart */
let myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    datasets: [{
      data: [30, 40],
      backgroundColor: colorHex
    }],
    labels: labels
  },
  options: {
    responsive: true,
    legend: {
      position: 'bottom'
    },
    plugins: {
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'start',
        offset: -10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 25,
        backgroundColor: (context) => {
          return context.dataset.backgroundColor;
        },
        font: {
          weight: 'bold',
          size: '10'
        },
        formatter: (value) => {
          return value + ' %';
        }
      }
    }
  }
})