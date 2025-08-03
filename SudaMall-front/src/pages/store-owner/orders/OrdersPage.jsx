import React, { useState, useEffect } from "react";
import ArrowCircleRightR from "../../../../src/assets/icons/ArrowCircleRightR.svg";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("confirmed");
  const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fakeOrders = [
      // ✅ Confirmed
      ...Array.from({ length: 20 }, (_, i) => ({
        id: 1000 + i,
        date: "15/07/25",
        customer_name: "محمد عبد الله",
        total_price: 800 + i * 10,
        profit: 100 + i * 5,
        status: "confirmed",
      })),

      // ❌ Canceled
      ...Array.from({ length: 20 }, (_, i) => ({
        id: 2000 + i,
        date: "13/07/25",
        customer_name: "أحمد علي",
        total_price: 850 + i * 8,
        profit: 90 + i * 3,
        status: "canceled",
      })),

      // ⏳ Pending
      ...Array.from({ length: 20 }, (_, i) => ({
        id: 3000 + i,
        date: "03/08/25",
        customer_name: "سارة يوسف",
        total_price: 112000 + i * 7,
        profit: 122210 + i * 2,
        status: "pending",
      })),

      // ✅ Completed
      ...Array.from({ length: 20 }, (_, i) => ({
        id: 4000 + i,
        date: "21/08/25",
        customer_name: "خالد مصطفى",
        total_price: 950 + i * 9,
        profit: 120 + i * 4,
        status: "completed",
      })),
    ];

    setOrders(fakeOrders.filter((order) => order.status === activeTab));
  }, [activeTab]);

  const statuses = [
    { key: "confirmed", label: "المؤكدة" },
    { key: "canceled", label: "الملغية" },
    { key: "pending", label: "المعلقة" },
    { key: "completed", label: "المكتملة" },
  ];

  return (
    <div className="min-h-screen bg-white text-xs text-right p-3">
      {/* Header */}
      <div className="relative p-4 text-base  border-b border-gray-200 flex items-center">
        <Link
          to ={`/store-owner/${userId}/dashboard`} 
          className="top-10 left-6 text-white hover:text-gray-200"
        >
          <img src={ArrowCircleRightR} alt="رجوع" className="h-6 w-6" />
        </Link>
        <span className="absolute left-1/2 transform -translate-x-1/2">
          إدارة الطلبات
        </span>
      </div>

      {/* Tabs */}
      <div className="flex justify-around items-center  border-b border-gray-400 shadow-md text-xs">
        {statuses.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`mt-2 mb-2 py-1 px-4 cursor-pointer rounded-xl transition-all duration-300 ${
              activeTab === key ? "font-semibold" : "text-black"
            }`}
            style={
              activeTab === key
                ? { backgroundColor: "var(--primary)", color: "white" }
                : {}
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto px-3 py-2 pb-32">
        <table className="w-full text-xs text-center border-separate border-spacing-y-2">
          <thead style={{backgroundColor: "var(--light-gold)"}}>
            <tr>
              <th className="p-3">رقم الطلب</th>
              <th className="p-3">التاريخ</th>
              <th className="p-3">العميل</th>
              <th className="p-3">الإجمالي</th>
              <th className="p-3">الربح</th>
              <th className="p-3">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white text-center shadow rounded"
                >
                  <td className="p-3 text-blue-800 font-medium cursor-pointer underline hover:text-amber-400 transition-colors duration-200">
                    <Link to={`/store-owner/${userId}/orders/${order.id}`}>#{order.id}</Link>
                  </td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.customer_name}</td>
                  <td className="p-3  whitespace-nowrap">{order.total_price} ج</td>
                  <td className="p-3  whitespace-nowrap">{order.profit} ج</td>
                  <td
                    className={`p-3 font-semibold ${
                      order.status === "confirmed"
                        ? "text-green-600"
                        : order.status === "canceled"
                        ? "text-red-600"
                        : order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "completed"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {translateStatus(order.status)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  لا توجد طلبات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const translateStatus = (status) => {
  switch (status) {
    case "confirmed":
      return "مؤكد";
    case "canceled":
      return "ملغي";
    case "pending":
      return "معلق";
    case "completed":
      return "مكتمل";
    default:
      return status;
  }
};

export default OrdersPage;
