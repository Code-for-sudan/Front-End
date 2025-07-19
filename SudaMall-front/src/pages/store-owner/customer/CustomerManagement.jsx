import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ArrowCircleRightR from '../../../../src/assets/icons/ArrowCircleRightR.svg';

const originalCustomers = new Array(10).fill({
  name: 'أحمد علي',
  phone: '0935642289',
  email: 'ahmedali25@gmail.com',
  lastPurchase: '٢٠٢٥/٠٣/٢٥',
  avatar: 'https://i.pravatar.cc/40',
});

const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = originalCustomers.filter((customer) =>
    customer.name.includes(searchTerm) || customer.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-white text-xs text-right p-3">
      {/* Header */}
      <div className="relative p-4 text-base border-b border-gray-200 flex items-center">
        <Link
          to="/store-owner/:userId/dashboard"
          className="top-10 left-6 text-white hover:text-gray-200"
        >
          <img src={ArrowCircleRightR} alt="رجوع" className="h-6 w-6" />
        </Link>
        <span className="absolute left-1/2 transform -translate-x-1/2">
          إدارة العملاء
        </span>
      </div>

      {/* 🔍 حقل البحث */}
      <div className="px-3 py-2">
        <input
          type="text"
          placeholder="بحث"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-right"
        />
      </div>

      {/* جدول العملاء */}
      <div className="overflow-x-auto px-3 py-2 pb-32">
        <table className="w-full text-xs text-center border-separate border-spacing-y-2">
          <thead style={{ backgroundColor: "var(--light-gold)" }}>
            <tr>
              <th className="p-3">الاسم</th>
              <th className="p-3">رقم الهاتف</th>
              <th className="p-3">آخر عملية شراء</th>
              <th className="p-3">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer, idx) => (
                <tr key={idx} className="bg-white text-center shadow rounded">
                  <td className="p-3 flex items-center gap-2 justify-end">
                    <div className="text-right">
                      <div className="font-semibold">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                    <img
                      src={customer.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.lastPurchase}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  لا يوجد نتائج مطابقة.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerManagement;
