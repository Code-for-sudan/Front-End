import { useState } from "react";
import { DailySales, WeeklySales } from "../../../components/store-owner/dashboard";
import { MainTitle } from '../../../components/reusable';

import { SalesAndCosts } from "../../../data/SalesAndCosts"; // this will replaced with endpoint /total-sales?period=week
import { DailySalesData } from "../../../data/DailySales";  // this will replaced with endpoint /total-sales?period=day

const TotalSales = () => {
  const [view, setView] = useState("daily"); // 'daily' or 'weekly'


  return (
    <div className="container">
      {/* Header & Navigation */}
      <MainTitle
          title={"إجمالي المبيعات / التكلفة"}
          navigatePath={-1} 
          />

   {/* Select Filter */}
      <select
        value={view}
        onChange={(e) => setView(e.target.value)}
        className="p-2 bg-white shadow-md rounded-md text-xs focus:outline-none focus:ring-0 relative mb-6 cursor-pointer"
      >
        <option value="weekly" className="bg-white shadow  text-black">أسبوعي</option>
        <option value="daily" className="bg-white shadow  text-black">يومي</option>
      </select>

      {/* Conditional Chart Rendering */}
      {view === "weekly" ? (
        <WeeklySales SalesAndCosts={SalesAndCosts} />
      ) : (
        <DailySales DailySalesData={DailySalesData} />
      )}
    </div>
  );
};

export default TotalSales;
