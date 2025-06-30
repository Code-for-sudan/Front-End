import React, { useState } from 'react'
import TodayClients from './TodayClients';
import WeeklyClients from './WeeklyClients';
import { TodayClientsData } from '../../../../data/TodayClients' // this will be replaced with backend response data
import { WeekClientsData } from '../../../../data/WeekClients'; // this also will be replaced with backend response data
import { MainTitle } from '../../../../components/reusable';

const NewClients = () => {
  const [view, setView] = useState("daily"); // 'daily' or 'weekly'

  return (
     <div className="container">
          {/* Header & Navigation */}
        <MainTitle
            title={"العملاء الجدد"}
            navigatePath={-1} 
            />

       {/* Select Filter */}
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="p-2 bg-white shadow-md rounded-md text-sm focus:outline-none focus:ring-0 relative mb-6 cursor-pointer"
          >
            <option value="weekly" className="bg-white shadow text-black">أسبوعي</option>
            <option value="daily" className="bg-white shadow text-black">يومي</option>
          </select>
    
          {/* Conditional Chart Rendering */}
          {view === "daily" ? (
            <TodayClients TodayClientsData={TodayClientsData} />
        ) : (
            <WeeklyClients WeeklyClientsData={WeekClientsData} />
        )}
    </div>
  )
}

export default NewClients
