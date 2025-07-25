import React, { useState } from 'react'
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

// product card props


// product card component
function ProductCard({ name, price, picture, store_name, size = null, favorite = false }) {

  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className='w-full flex flex-col gap-4'>
        <div className='relative w-full h-48 border-1 border-gray-200 rounded-sm'>
            <button 
                className='absolute top-2 left-3 p-2 bg-white shadow-md
                     rounded-full flex items-center justify-center cursor-pointer text-xl'
                onClick={() => handleFavoriteToggle()}
            >
                {isFavorite ? <MdFavorite /> : <MdFavoriteBorder/>}
            </button>
            <img 
                src={`https://sudamall.ddns.net${picture}`}
                alt={name}
                className='w-full h-full object-contain mb-2'
            />
        </div>
        <div className='w-full flex flex-col gap-2'>
            <div className='w-full flex flex-row items-center justify-between'>
                <h4 className='text-md font-semibold text-gray-800'>{name}</h4>
                <p className='text-sm text-gray-600'>السعر: {price} جنيه</p>
            </div>
            {store_name && <p className='text-sm text-gray-500'>المتجر: {store_name}</p>}
            {size && <p className='text-sm text-gray-500'>المقاس: {size}</p>}
        </div>

        <div className='w-full flex flex-row gap-2 text-sm'>
            <button className='w-full bg-[#FCA311CC] text-white py-2 rounded-md hover:bg-[#FCA311] transition-colors'>
                إضافة إلى السلة
            </button>
            <button className='w-3/4 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors'>
                تفاصيل المنتج
            </button>
        </div>
    </div>
  )
}

export default ProductCard
