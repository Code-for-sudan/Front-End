import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SingleWeeklyChart = ({ data, title, unit = '' }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {}
  });

  useEffect(() => {
    // Arabic weekdays order (Saturday to Friday)
    const arabicWeekdays = {
      Saturday: 'السبت',
      Sunday: 'الأحد',
      Monday: 'الاثنين',
      Tuesday: 'الثلاثاء',
      Wednesday: 'الأربعاء',
      Thursday: 'الخميس',
      Friday: 'الجمعة'
    };

    // Convert and sort by known week order
    const weekOrder = [
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ];

    const sorted = weekOrder.map(day => {
      const found = data.find(d => d.weekday === day);
      return {
        label: arabicWeekdays[day],
        count: found ? found.count : 0
      };
    });

    const categories = sorted.map(item => item.label);
    const values = sorted.map(item => item.count);

    setChartData({
      series: [
        {
          name: title,
          data: values
        }
      ],
      options: {
        chart: {
          type: 'area',
          height: 300,
          zoom: { enabled: false }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
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
          categories,
          labels: {
            rotate: -45,
            style: {
              fontSize: '13px'
            }
          }
        },
        yaxis: {
          min: 0,
          max: 140,
          tickAmount: 7,
          labels: {
            formatter: val => `${val}`,
            style: {
              fontSize: '13px'
            }
          }
        },
        tooltip: {
          y: {
            formatter: val => `${val.toLocaleString()} ${unit}`
          }
        },
        colors: ['#8979FF']
      }
    });
  }, [data, title, unit]);

  return (
    <div className="w-full">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={250}
      />
      <p className="text-center mt-2 text-lg font-bold text-gray-700">{title}</p>
    </div>
  );
};

export default SingleWeeklyChart;
