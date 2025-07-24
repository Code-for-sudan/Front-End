import React from 'react'
import { MdOutlineArrowCircleRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const navigate = useNavigate();

   const handleCloseEdit = () => {
    navigate(-1)
    };

  return (
    <div className='bg-white container px-4 py-6'>
        <div className="relative flex items-center justify-center w-full mb-6">
            <MdOutlineArrowCircleRight
            onClick={handleCloseEdit}
            className="absolute -top-1 right-0 w-8 h-8 cursor-pointer"
            />
            <h2 className="text-base font-bold">تعديل المنتج</h2>
        </div>
    </div>
  )
}

export default EditProduct
