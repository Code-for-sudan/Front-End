import React from 'react'
import { MdAdd } from 'react-icons/md'

function ShoppingBasket() {
  return (
    <li onClick={handleAddProduct} className="flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out">
        <div className="absolute -top-6 p-2 text-white bg-dark-blue shadow-lg rounded-full z-50">
            <MdAdd className="size-8" />
        </div>
    </li>
  )
}

export default ShoppingBasket