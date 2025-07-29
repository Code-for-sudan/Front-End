/**
 * Component: CustomertDetails
 * Description:
 * - Displays a customer's profile including personal details, order statistics, and order history.
 * - Supports order filtering by status (all, completed, canceled).
 * - Provides expand/collapse functionality to show order item details.
 */

import React, { useState } from "react";
import ArrowCircleRightR from "../../../../src/assets/icons/ArrowCircleRightR.svg";
import PageHeader from "../../../components/reusable/PageHeader";
import {
  ShoppingCart,
  CaretCircleDown,
  CaretCircleUp,
} from "../../../assets/icons";

const CustomertDetails = () => {
  // State to track expanded row index for showing order details
  const [expandedOrder, setExpandedOrder] = useState(null);

  // State to track active order filter tab
  const [filter, setFilter] = useState("all"); // possible values: "all", "completed", "canceled"

  // Static list of customer orders
  const orders = [
    {
      id: "#12345",
      date: "2023/05/25",
      time: "3:30 م",
      total: "750 ج.س",
      method: "كاش",
      status: "مكتمل",
      items: [
        { id: "#123", name: "سماعة", price: "150", qty: 3, total: "450 ج.س" },
        { id: "#124", name: "شاحن", price: "150", qty: 2, total: "300 ج.س" },
      ],
    },
    {
      id: "#12346",
      date: "2023/05/24",
      time: "2:15 م",
      total: "950 ج.س",
      method: "كاش",
      status: "ملغي",
      items: [
        { id: "#125", name: "كابل", price: "200", qty: 2, total: "400 ج.س" },
      ],
    },
    {
      id: "#12347",
      date: "2023/05/23",
      time: "12:45 م",
      total: "500 ج.س",
      method: "بطاقة",
      status: "مكتمل",
      items: [
        {
          id: "#126",
          name: "باور بانك",
          price: "250",
          qty: 2,
          total: "500 ج.س",
        },
      ],
    },
    {
      id: "#12348",
      date: "2023/05/22",
      time: "1:15 م",
      total: "650 ج.س",
      method: "كاش",
      status: "ملغي",
      items: [
        {
          id: "#127",
          name: "سماعة بلوتوث",
          price: "650",
          qty: 1,
          total: "650 ج.س",
        },
      ],
    },
  ];

  // Apply filter to orders list
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "completed") return order.status === "مكتمل";
    if (filter === "canceled") return order.status === "ملغي";
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-sm text-right p-2">
      {/* Page title and back button */}
      <PageHeader
        title="تفاصيل العميل"
        backTo="/store-owner/:userId/customers"
        icon={ArrowCircleRightR}
      />

      {/* Customer avatar and basic info */}
      <div className="flex items-center gap-3 mt-3 mb-3">
        <img
          src="https://i.pravatar.cc/300"
          alt="Customer Avatar"
          className="w-12 h-12 rounded-full border"
        />
        <div>
          <h3 className="font-bold">أحمد علي</h3>
          <p className="text-sm text-gray-500">ahmedali234@gmail.com</p>
        </div>
      </div>

      {/* Personal information section */}
      <h4 className="text-lg mb-2 mr-3">معلومات شخصية</h4>
      <div className="flex justify-center items-center">
        <div className="w-84 border border-gray-200 rounded-xl p-3 text-sm">
          <div className="grid grid-cols-2 gap-y-2 text-right">
            <span className="font-semibold">رقم الهاتف:</span>
            <p>093546789</p>

            <span className="font-semibold">الموقع:</span>
            <p>الخرطوم، شارع الحرية</p>

            <span className="font-semibold">الجنس:</span>
            <p>ذكر</p>
          </div>
        </div>
      </div>

      {/* Start chat action */}
      <div className="flex justify-center">
        <button
          className="w-64 mt-4 text-white py-2 rounded-xl shadow font-bold hover:bg-orange-500"
          style={{ backgroundColor: "var(--primary)" }}
        >
          بدء محادثة
        </button>
      </div>

      {/* Orders summary and filtering section */}
      <div className="mt-6">
        <h4 className="text-lg mb-4">الطلبات</h4>

        {/* Order status summary cards */}
        <div className="grid grid-cols-3 gap-3 text-center mb-3">
          {[{ label: "إجمالي الطلبات", count: 130, color: "purple-600" },
            { label: "الطلبات المكتملة", count: 120, color: "green-600" },
            { label: "الطلبات الملغاة", count: 10, color: "red-500" }
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between border rounded-xl border-${item.color} py-2 px-1 text-xs shadow-sm`}
            >
              <div className="flex-grow text-right pr-2">
                <p>{item.label}</p>
                <p className={`text-${item.color} font-bold text-lg`}>
                  {item.count}
                </p>
              </div>
              <img
                src={ShoppingCart}
                alt=""
                className="w-9 h-9 object-contain flex-shrink-0"
              />
            </div>
          ))}
        </div>

        {/* Filter tabs: All / Completed / Canceled */}
        <div className="flex justify-between mb-3 py-1 px-3 bg-gray-100">
          <button
            onClick={() => setFilter("all")}
            className={`text-xs p-2 rounded-xl ${
              filter === "all" ? "text-white shadow" : "text-gray-400"
            }`}
            style={
              filter === "all" ? { backgroundColor: "var(--primary)" } : {}
            }
          >
            اجمالي الطلبات
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`text-xs p-2 rounded-xl ${
              filter === "completed" ? "text-white shadow" : "text-gray-400"
            }`}
            style={
              filter === "completed"
                ? { backgroundColor: "var(--primary)" }
                : {}
            }
          >
            الطلبات المكتملة
          </button>
          <button
            onClick={() => setFilter("canceled")}
            className={`text-xs p-2 rounded-xl ${
              filter === "canceled" ? "text-white shadow" : "text-gray-400"
            }`}
            style={
              filter === "canceled" ? { backgroundColor: "var(--primary)" } : {}
            }
          >
            الطلبات الملغاة
          </button>
        </div>

        {/* Sorting + Search bar */}
        <div className="flex justify-between items-center mb-2 gap-2">
          <p className="text-gray-400 flex-shrink-0">ترتيب حسب الأحدث</p>
          <input
            type="search"
            placeholder="ابحث عن طريق رقم الطلب"
            className="text-xs border border-gray-200 px-2 py-1 rounded-md w-1/2"
          />
        </div>

        {/* Orders Table */}
        <table className="w-full text-[10px] text-center border-separate border-spacing-y-1">
          <thead style={{ backgroundColor: "var(--light-gold)" }}>
            <tr>
              <th className="py-2 px-2">رقم الطلب</th>
              <th>التاريخ</th>
              <th>الزمن</th>
              <th>الإجمالي</th>
              <th>طريقة الدفع</th>
              <th>حالة الطلب</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <React.Fragment key={idx}>
                {/* Order Row */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 px-2">{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.time}</td>
                  <td>{order.total}</td>
                  <td>{order.method}</td>
                  <td>
                    <span
                      className={`flex items-center gap-1 flex-row-reverse ${
                        order.status === "مكتمل"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setExpandedOrder(expandedOrder === idx ? null : idx)
                        }
                      >
                        <img
                          src={
                            expandedOrder === idx
                              ? CaretCircleUp
                              : CaretCircleDown
                          }
                          alt="Toggle Icon"
                          className="w-5 h-5"
                        />
                      </button>
                      {order.status}
                    </span>
                  </td>
                </tr>

                {/* Order Details (Expandable Section) */}
                {expandedOrder === idx && (
                  <tr>
                    <td colSpan={6} className="bg-white text-right p-3">
                      <div className="grid grid-cols-6 gap-4 font-semibold border-b pb-1 mb-2 text-[10px]">
                        <div>رقم الطلب</div>
                        <div>اسم المنتج</div>
                        <div>السعر</div>
                        <div>الكمية</div>
                        <div>تخفيض</div>
                        <div>الإجمالي</div>
                      </div>
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-6 gap-4 mb-1 text-[10px]"
                        >
                          <div>{item.id}</div>
                          <div>{item.name}</div>
                          <div>{item.price}</div>
                          <div>{item.qty}</div>
                          <div>__</div>
                          <div>{item.total}</div>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomertDetails;
