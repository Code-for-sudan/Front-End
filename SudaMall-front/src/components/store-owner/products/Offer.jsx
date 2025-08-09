import React, { useEffect, useMemo, useState } from "react";
import { offerValidations } from "../../../utils/offerValidations";

const { hasChanged, getDateError, isPriceInvalidFn, isComplete } =
  offerValidations();

const Offer = ({
  formData,
  handleOfferChange,
  onSubmit,
  handleDeleteOffer,
  has_offer,
}) => {
  const [initialOffer, setInitialOffer] = useState();

  // set initial offer when mount component
  useEffect(() => {
    setInitialOffer(formData.offer);
  }, []);

  const { offer_price, start_date, end_date } = formData.offer || {};

  const offerComplete = useMemo(
    () => isComplete(offer_price, start_date, end_date),
    [offer_price, start_date, end_date]
  );

  const offerChanged = useMemo(
    () => hasChanged({ offer_price, start_date, end_date }, initialOffer),
    [offer_price, start_date, end_date, initialOffer]
  );

  const dateErrorMessage = useMemo(
    () => getDateError(start_date, end_date),
    [start_date, end_date]
  );

  const priceInvalid = useMemo(
    () => isPriceInvalidFn(offer_price, formData.price),
    [offer_price, formData.price]
  );

  const saveEnabled =
    offerComplete && offerChanged && !dateErrorMessage && !priceInvalid;

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
            priceInvalid ? "border-red-500" : "border-gray-300"
          }`}
          value={offer_price || ""}
          onChange={handleOfferChange}
          required
        />
        {priceInvalid && (
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
            dateErrorMessage ? "border-red-500" : "border-gray-300"
          }`}
          value={end_date || ""}
          onChange={handleOfferChange}
        />
        {dateErrorMessage && (
          <p className="text-red-500 text-xs mt-1">{dateErrorMessage}</p>
        )}
      </div>

      {/* Action buttons */}
      <div className="pt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!saveEnabled}
          className={`flex-1 py-2 rounded-md ${
            saveEnabled
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
