"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

const SparkChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [
      {
        data: [1, 5, 3, 2, 5, 6, 7, 8],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        fill: true,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 100);
        gradient.addColorStop(0, 'rgba(0, 123, 255, .2)'); // Start color (top)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');   // End color (bottom)

        setChartData({
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          datasets: [
            {
              data: [1, 5, 3, 2, 5, 6, 7, 8],
              borderColor: '#007bff',
              backgroundColor: gradient, // Apply gradient
              fill: true,
              tension: 0.1,
            },
          ],
        });
      }
    }
  }, []);

  const options: ChartOptions<'line'> = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    devicePixelRatio: 4,
    responsive: false,
  };

  return (
    <div className='overflow-hidden'>
      <canvas ref={chartRef} style={{ display: 'none'}} />
      <Line data={chartData} options={options} height={40} width={350}/>
    </div>
  );
};

export default SparkChart;
