import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border border-gray-300 bg-gray-50 p-3 rounded-md flex items-center justify-between gap-6 text-xs animate-pulse">
          {/* Image and text section */}
          <div className="flex flex-1 items-center gap-2">
            <div className="w-[60px] h-[60px] bg-gray-300 rounded" />
            <div className="flex flex-col gap-2">
              <div className="w-16 h-3 bg-gray-300 rounded" />
              <div className="w-12 h-3 bg-gray-300 rounded" />
            </div>
          </div>

          {/* Availability and category */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-18 h-5 bg-gray-300 rounded" />
            <div className="w-16 h-3 bg-gray-300 rounded" />
          </div>

          {/* Edit/Delete icons */}
          <div className="flex flex-col items-center justify-between gap-3 text-lg">
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
