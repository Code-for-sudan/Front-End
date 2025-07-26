import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SingleDailyChart = ({ data, title, unit }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {

    const categories = data.map(item => item.hour);
    const count = data.map(item => item.count);

    setChartData({
      series: [
        {
          name: title,
          data: count
        },
      ],
      options: {
        chart: {
          type: 'area',
          height: 350,
          zoom: { enabled: false }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 1
        },
        markers: {
          size: 4,
          colors: ['#fff'],
          strokeColors: '#8979FF',
          strokeWidth: 2,
          hover: {
            size: 6
          }
        },
        xaxis: {
          categories: categories,
        //   tickAmount: 24,
          labels: {
            style: {
              fontSize: '13px'
            },
            rotate: -45,
            formatter: (value) => {
              const specialTicks = ['06:00', '12:00', '18:00', '00:00'];
              return specialTicks.includes(value) ? value : '';
            }
          },
        },
        yaxis: {
          min: 0,
          max: 40,
          tickAmount: 8,
          labels: {
            formatter: (value) => {
              return value;
            },
            style: {
              fontSize: '13px'
            }
          },
        },
        tooltip: {
          y: {
            formatter: (val) => `${val.toLocaleString()} ${unit}`
          }
        },
        colors: ['#8979FF']
      }
    });
  }, []);

  return (
    <div className="w-full">
      <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={250} />
    </div>
  );
};

export default SingleDailyChart;
