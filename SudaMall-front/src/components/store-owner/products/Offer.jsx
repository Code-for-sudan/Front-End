import React, { useMemo } from "react";

const Offer = ({ formData, handleOfferChange, onSubmit, handleDeleteOffer, initialOffer, has_offer }) => {
  const { offer_price, start_date, end_date } = formData.offer || {};

  // Check if all offer fields are filled
  const isOfferComplete = useMemo(() => {
    return (
      offer_price !== "" &&
      offer_price != null &&
      start_date !== "" &&
      start_date != null &&
      end_date !== "" &&
      end_date != null
    );
  }, [offer_price, start_date, end_date]);

  // Check if the offer has changed compared to initial
  const isOfferChanged = useMemo(() => {
    if (!initialOffer) {
      // If there's no initial offer, any complete offer counts as changed
      return isOfferComplete;
    }
    return (
      offer_price !== initialOffer.offer_price ||
      start_date !== initialOffer.start_date ||
      end_date !== initialOffer.end_date
    );
  }, [offer_price, start_date, end_date, initialOffer, isOfferComplete]);

  // Validate date range
  const isDateInvalid = useMemo(() => {
    return new Date(end_date) <= new Date(start_date);
  }, [start_date, end_date]);

  // Validate offer price
  const isPriceInvalid = useMemo(() => {
    if (!offer_price || !formData.price) return false;
    return Number(offer_price) >= Number(formData.price);
  }, [offer_price, formData.price]);

  // Enable save only if form changed, complete, and valid
  const isSaveEnabled =
    isOfferComplete && isOfferChanged && !isDateInvalid && !isPriceInvalid;

  return (
    <div className="flex flex-col gap-4 text-gray-800">
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
          className={`w-full text-xs border rounded-md p-2 focus:outline-none focus:ring ${
            isPriceInvalid ? "border-red-500" : "border-gray-300"
          }`}
          value={offer_price || ""}
          onChange={handleOfferChange}
          required
        />
        {isPriceInvalid && (
          <p className="text-red-500 text-xs mt-1">
            يجب أن يكون السعر بعد الخصم أقل من السعر الأساسي
          </p>
        )}
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
          value={start_date || ""}
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
          className={`w-full text-xs border rounded-md p-2 focus:outline-none focus:ring ${
            isDateInvalid ? "border-red-500" : "border-gray-300"
          }`}
          value={end_date || ""}
          onChange={handleOfferChange}
        />
        {isDateInvalid && (
          <p className="text-red-500 text-xs mt-1">
            يجب أن يكون تاريخ نهاية العرض بعد تاريخ البداية
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="pt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!isSaveEnabled}
          className={`flex-1 py-2 rounded-md ${
            isSaveEnabled
              ? "bg-primary text-white hover:bg-opacity-90 cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          حفظ العرض
        </button>

        <button
          type="button"
          onClick={handleDeleteOffer}
          disabled={!has_offer}
          className={`flex-1 py-2 rounded-md border ${
            has_offer
              ? "border-red-500 text-red-500 hover:bg-red-50 cursor-pointer"
              : "border-gray-300 text-gray-400 cursor-not-allowed"
          }`}
        >
          حذف العرض
        </button>
      </div>
    </div>
  );
};

export default Offer;
