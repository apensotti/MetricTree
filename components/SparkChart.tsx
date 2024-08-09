import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LinearScale, CategoryScale, LineElement} from 'chart.js'

ChartJS.register(LinearScale, CategoryScale, LineElement)

const SparkChart = () => {
  
    const options = {};

    const data = {};
  
    return <Line options={options} data={data}/>;
}

export default SparkChart