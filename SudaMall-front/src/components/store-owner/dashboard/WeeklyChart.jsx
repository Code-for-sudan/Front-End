import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const WeeklyChart = ({ SalesAndCosts }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    const weeklyData = SalesAndCosts.weekly_summary;

    const categories = weeklyData.map(item => item.day);
    const sales = weeklyData.map(item => item.sales);
    const costs = weeklyData.map(item => item.costs);

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
          size: 4,       // ✅ Show dots
          colors: ['#FF928A', '#8979FF'], // optional: match series colors
          strokeColors: '#fff',
          strokeWidth: 2,
          hover: {
            size: 6
          }
        },
        xaxis: {
          categories: categories,
          labels: {
            style: {
              fontSize: '14px'
            }
          }
        },
        yaxis: {
          min: 0,
          max: 8000,
          tickAmount: 4,
          // forceNiceScale: false,
          labels: {
               formatter: (value) => {
                  const allowed = [0, 2000, 4000, 6000, 8000];
                  return allowed.includes(value)
                    ? value === 0
                      ? '0'
                      : `${value / 1000}K`
                    : '';
                },
            style: {
              fontSize: '13px'
            }
          }
        },
        tooltip: {
          y: {
            formatter: (val) => `${val.toLocaleString()} ${SalesAndCosts.currency}`
          }
        },
        colors: ['#FF928A', '#8979FF'],
      }
    });
  }, []);

  return (
    <>
      <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={250} />
    </>
  );
};

export default WeeklyChart;
