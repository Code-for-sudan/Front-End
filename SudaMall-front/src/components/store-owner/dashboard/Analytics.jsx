import React from 'react'
import { AnalyticsData } from '../../../constants';

const Analytics = () => {
  return (
    <div className='grid grid-cols-2 items-center justify-center gap-4 mt-8'>
     {AnalyticsData.map((item, index) => (
        <button
            key={index}
            className={`${item.bgClass} relative text-white flex flex-col gap-2 items-start p-4 rounded-xl`}
        >
            <p className="text-xl font-semibold">{item.label}</p>
            <p className="text-4xl font-semibold z-50">{item.value >= 1000 ? `${item.value / 1000}k`: item.value}</p>
            <img
            src={item.icon}
            alt="icon"
            className="absolute bottom-2 left-2 w-10 h-10"
            />
        </button>
        ))}
    </div>
  )
}

export default Analytics;
