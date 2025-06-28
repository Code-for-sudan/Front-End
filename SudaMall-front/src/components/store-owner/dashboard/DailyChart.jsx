import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const DailyChart = ({ DailySalesData }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    const daily = DailySalesData.daily_summary;

    const categories = daily.map(item => item.hour);
    const sales = daily.map(item => item.sales);
    const costs = daily.map(item => item.costs);

    setChartData({
      series: [
        {
          name: 'المبيعات',
          data: sales
        },
        {
          name: 'التكلفة',
          data: costs
        }
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
          colors: ['#FF928A', '#8979FF'],
          strokeColors: '#fff',
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
          max: 2000,
          tickAmount: 4,
          labels: {
            formatter: (value) => {
              return value === 0 ? '0' : `${value / 1000}K`;
            },
            style: {
              fontSize: '13px'
            }
          },
        },
        tooltip: {
          y: {
            formatter: (val) => `${val.toLocaleString()} ${DailySalesData.currency}`
          }
        },
        colors: ['#FF928A', '#8979FF']
      }
    });
  }, []);

  return (
    <div className="w-full">
      <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={250} />
    </div>
  );
};

export default DailyChart
