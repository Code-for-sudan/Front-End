import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton'

const FilterProductsSkeleton = () => {
  return (
    <div className="pb-4 w-full mb-10">
        <div className="flex gap-4 mb-4 text-xs">
            {/* Skeleton for Product Type Filter */}
            <div className="flex-1">
                <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse"></div>
            </div>

            {/* Skeleton for Availability Status Filter */}
            <div className="flex-1">
                <div className="h-10 w-full rounded-md bg-gray-200 animate-pulse"></div>
            </div>
        </div>
        
        {/* product cards loading */}
        <ProductCardSkeleton />
    </div>
  )
}

export default FilterProductsSkeleton
