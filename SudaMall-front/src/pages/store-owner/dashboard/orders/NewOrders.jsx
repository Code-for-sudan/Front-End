import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowCircleRight } from 'react-icons/md';
import TodayOrders from './TodayOrders';
import WeeklyOrders from './WeeklyOrders';
import { TodayOrdersData } from '../../../../data/TodayOrders';
import { WeeklyOrdersData } from '../../../../data/WeekOrders';
import { success } from '../../../../assets/icons';

const NewOrders = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("daily"); // 'daily' or 'weekly'

  return (
     <div className="container">
          {/* Header & Navigation */}
          <div className="relative flex items-center justify-center w-full mt-8 mb-6">
            <MdOutlineArrowCircleRight
              onClick={() => navigate(-1)}
              className="absolute top-0 right-0 w-8 h-8 cursor-pointer"
            />
            <h2 className="text-xl font-bold">الطلبات الجديدة</h2>
          </div>
    
       {/* Select Filter */}
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="p-2 bg-white shadow-md rounded-md text-lg font-bold focus:outline-none focus:ring-0 relative mb-6 cursor-pointer"
          >
            <option value="weekly" className="bg-white shadow  font-bold text-black">أسبوعي</option>
            <option value="daily" className="bg-white shadow  font-bold text-black">يومي</option>
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
