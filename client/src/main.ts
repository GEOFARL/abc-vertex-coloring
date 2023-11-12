import Chart, { ChartItem } from 'chart.js/auto';
import colorLib from '@kurkle/color';

const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

function transparentize(value: string, opacity: number) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

(async () => {
  const loader = document.querySelector('.loader')!;

  const response = await fetch('http://localhost:8000/getData');
  const data = await response.json();
  loader.setAttribute('style', 'display: none;');

  const ctx = document.getElementById('myChart')!;

  const xLabels = [];
  for (let i = 20; i <= 1000; i += 20) {
    xLabels.push(i);
  }

  new Chart(ctx as ChartItem, {
    type: 'bar',
    data: {
      labels: xLabels,
      datasets: [
        {
          label: 'Chromatic number',
          data,
          borderWidth: 1,
          borderColor: CHART_COLORS.red,
          backgroundColor: transparentize(CHART_COLORS.red, 0.5),
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
})();
