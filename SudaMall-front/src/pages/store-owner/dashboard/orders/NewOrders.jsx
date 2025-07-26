import React, { useState } from 'react'
import TodayOrders from './TodayOrders';
import WeeklyOrders from './WeeklyOrders';
import { TodayOrdersData } from '../../../../data/TodayOrders';
import { WeeklyOrdersData } from '../../../../data/WeekOrders';
import { success } from '../../../../assets/icons';
import { MainTitle } from '../../../../components/store-owner/reusable';

const NewOrders = () => {
  const [view, setView] = useState("daily"); // 'daily' or 'weekly'

  return (
     <div className="container">
          {/* Header & Navigation */}
          <MainTitle
            title={"الطلبات الجديدة"}
            navigatePath={-1} 
            />
    
       {/* Select Filter */}
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="p-2 bg-white shadow-md rounded-md text-xs focus:outline-none focus:ring-0 relative mb-6 cursor-pointer"
          >
            <option value="weekly" className="bg-white shadow text-black">أسبوعي</option>
            <option value="daily" className="bg-white shadow text-black">يومي</option>
          </select>
    
          {/* Conditional Chart Rendering */}
          {view === "daily" ? (
            <TodayOrders 
                TodayOrdersData={TodayOrdersData} 
                srcImg={success}
                />
        ) : (
            <WeeklyOrders 
                WeeklyOrdersData={WeeklyOrdersData}
                srcImg={success} 
                />
        )}
    </div>
  )
}

export default NewOrders;
