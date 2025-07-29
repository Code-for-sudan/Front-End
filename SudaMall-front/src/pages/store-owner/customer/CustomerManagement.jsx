import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ArrowCircleRightR from '../../../../src/assets/icons/ArrowCircleRightR.svg';
import { delete_icon, edit } from '../../../assets/icons';
import PageHeader from '../../../components/reusable/PageHeader';

const CustomerManagement = () => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // State to hold list of customers
  const [customers, setCustomers] = useState([]);

  // Loading and error state flags
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Popup state for delete confirmation
  const [deletePopup, setDeletePopup] = useState({ visible: false, customerId: null });

  // Reference to the WebSocket connection
  const socketRef = useRef(null);

  // WebSocket initialization on component mount
  useEffect(() => {
    // Replace with your actual backend WebSocket endpoint
    socketRef.current = new WebSocket('ws://localhost:3001');

    socketRef.current.onopen = () => {
      console.log('WebSocket Connected');

      // Initially fetch all customers (empty query)
      socketRef.current.send(JSON.stringify({ type: 'search', query: '' }));
    };

    // Handle incoming messages from server
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCustomers(data);
      setIsLoading(false);
    };

    // Handle socket errors
    socketRef.current.onerror = () => {
      setIsError(true);
      setIsLoading(false);
    };

    // Cleanup WebSocket connection on unmount
    return () => {
      socketRef.current?.close();
    };
  }, []);

  // Send search query through WebSocket whenever searchTerm changes
  useEffect(() => {
    if (socketRef.current) {
      setIsLoading(true);
      socketRef.current.send(JSON.stringify({ type: 'search', query: searchTerm }));
    }
  }, [searchTerm]);

  // Placeholder delete handler (connect to actual API)
  const handleDelete = (id) => {
    console.log('Deleting customer:', id);
    setDeletePopup({ visible: false, customerId: null });
  };

  return (
    <div className="min-h-screen bg-white text-sm text-right p-2">
      {/* Page header */}
      <PageHeader
        title="إدارة العملاء"
        backTo="/store-owner/:userId/dashboard"
        icon={ArrowCircleRightR}
      />

      {/* Search input */}
      <div className="px-2 py-1 text-center">
        <input
          type="text"
          placeholder="بحث"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 border border-gray-300 rounded-xl px-3 py-2 mb-3 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-400 text-right text-xs"
        />
      </div>

      {/* Customers table */}
      <div className="px-1 py-2 pb-24 overflow-x-auto">
        {isLoading ? (
          <p className="text-center py-10">جاري تحميل البيانات...</p>
        ) : isError ? (
          <p className="text-center py-10 text-red-500">حدث خطأ أثناء جلب البيانات.</p>
        ) : customers.length > 0 ? (
          <table className="w-full text-[11px] text-center border-separate border-spacing-y-1">
            <thead className="text-gray-700" style={{ backgroundColor: 'var(--light-gold)' }}>
              <tr>
                <th className="px-1 py-3 rounded-tr-lg">الاسم</th>
                <th className="px-1 py-3">رقم الهاتف</th>
                <th className="px-1 py-3">آخر عملية شراء</th>
                <th className="px-1 py-3 rounded-tl-lg"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="bg-white text-center shadow rounded">
                  <td className="px-1 py-1 flex items-center gap-1 justify-end">
                    <img src={customer.avatar} alt="avatar" className="w-6 h-6 rounded-full" />
                    <Link to={`/store-owner/:userId/customers/${customer.id}`}>
                      <div className="text-right">
                        <div className="font-semibold text-[11px]">{customer.name}</div>
                        <div className="text-gray-500 text-[10px]">{customer.email}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-1 py-1">{customer.phone}</td>
                  <td className="px-1 py-1">{customer.lastPurchase}</td>
                  <td className="px-1 py-1">
                    <div className="flex gap-3 justify-between">
                      <button>
                        <img src={edit} alt="Edit" className="w-5 h-6" />
                      </button>
                      <button onClick={() => setDeletePopup({ visible: true, customerId: customer.id })}>
                        <img src={delete_icon} alt="Delete" className="w-5 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-10 text-gray-500">لا يوجد نتائج مطابقة.</p>
        )}
      </div>

      {/* Delete confirmation popup */}
      {deletePopup.visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-5 rounded-xl shadow-xl w-72 text-center">
            <p className="mb-4 text-sm font-semibold">هل أنت متأكد من حذف هذا العميل؟</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => handleDelete(deletePopup.customerId)}
                className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                نعم، احذف
              </button>
              <button
                onClick={() => setDeletePopup({ visible: false, customerId: null })}
                className="px-4 py-1 bg-gray-300 rounded-md hover:bg-gray-400 text-sm"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
