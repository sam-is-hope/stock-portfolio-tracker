import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Portfolio Value',
        data: data.map(d => d.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default ChartComponent;
