"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

interface SparkChartProps {
  data: number[];
}

const SparkChart = (data:SparkChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0],
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
        gradient.addColorStop(0, 'rgba(0, 123, 255, .2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        setChartData({
          labels: data.data.map((_, index) => index),
          datasets: [
            {
              data: data.data,
              borderColor: '#007bff',
              backgroundColor: gradient,
              fill: true,
              tension: 0.0,
            },
          ],
        });
      }
    }
  }, [data]);

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
