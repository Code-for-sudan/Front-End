import { useState } from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { DailySales, WeeklySales } from "../../../components/store-owner/dashboard";
import { useNavigate } from "react-router-dom";
import { SalesAndCosts } from "../../../data/SalesAndCosts"; // this will replaced with endpoint /total-sales?period=week
import { DailySalesData } from "../../../data/DailySales";  // this will replaced with endpoint /total-sales?period=day

const TotalSales = () => {
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
        <h2 className="text-xl font-bold">إجمالي المبيعات / التكلفة</h2>
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
      {view === "weekly" ? (
        <WeeklySales SalesAndCosts={SalesAndCosts} />
      ) : (
        <DailySales DailySalesData={DailySalesData} />
      )}
    </div>
  );
};

export default TotalSales;
