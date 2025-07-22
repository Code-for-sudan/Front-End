import React from 'react'
import shoppingCartIcon from '/src/assets/icons/menu_icons/ShoppingCartCustomer.svg';


function ShoppingBasket({ iconSize,handleAddProduct }) {
  return (
    <li onClick={handleAddProduct} className="flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out">
        <div className="absolute -top-6 p-4 text-white bg-dark-blue shadow-lg rounded-full z-50">
            <img src={shoppingCartIcon} className={`size-${iconSize}`} />
        </div>
    </li>
  )
}

export default ShoppingBasket