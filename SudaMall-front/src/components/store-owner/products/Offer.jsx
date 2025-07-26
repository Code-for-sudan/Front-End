import React from 'react';

const Offer = ({ formData, handleOfferChange, toggleOffer }) => {
  return (
    <div className="flex flex-col gap-4 text-gray-800">
      {/* Toggle Offer */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">تفعيل / إلغاء تفعيل العرض</label>
        <button
          type="button"
          onClick={toggleOffer}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
            formData.offer.is_active ? 'bg-primary' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              formData.offer.is_active ? '-translate-x-6' : ''
            }`}
          />
        </button>
      </div>

      {/* Main price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-1">
          السعر الأساسي - قبل الخصم - (ج.س)
        </label>
        <input
          type="number"
          name="price"
          id="price"
          className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
          value={formData.price}
          onChange={handleOfferChange}
          disabled
        />
      </div>

      {/* Offer price */}
      <div>
        <label htmlFor="offer_price" className="block text-sm font-medium mb-1">
          السعر بعد الخصم (ج.س)
        </label>
        <input
          type="number"
          name="offer_price"
          id="offer_price"
          className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
          value={formData.offer.offer_price}
          onChange={handleOfferChange}
          required
        />
      </div>

      {/* Start date */}
      <div>
        <label htmlFor="start_date" className="block text-sm font-medium mb-1">
          تاريخ بداية العرض
        </label>
        <input
          type="date"
          name="start_date"
          id="start_date"
          className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
          value={formData.offer.start_date}
          onChange={handleOfferChange}
        />
      </div>

      {/* End date */}
      <div>
        <label htmlFor="end_date" className="block text-sm font-medium mb-1">
          تاريخ نهاية العرض
        </label>
        <input
          type="date"
          name="end_date"
          id="end_date"
          className="w-full text-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring"
          value={formData.offer.end_date}
          onChange={handleOfferChange}
        />
      </div>

              {/* add and cancel addition buttons  */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            className="flex-1 bg-primary text-white py-2 rounded-md hover:bg-opacity-90 cursor-pointer"
          >
            حفظ العرض
          </button>
          <button
            type="button"
            className="flex-1 border-2 border-gray-300 text-gray-600 py-2 rounded-md cursor-pointer"
          >
            إلغاء العرض
          </button>
        </div>
    </div>
  );
};

export default Offer;
