import React, { useState } from 'react'
import { GoHome } from "react-icons/go";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { PiShoppingCartBold } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { bg_nav } from '../../assets';

const StoreOwnerNav = () => {
  const [ active, setActive ] = useState('home');
  const navigate = useNavigate();

//   handle nav bar button click
  const handleClick = ({ id, path}) => {
    navigate(path);
    setActive(id)
  }
  return (
    <nav className="fixed bottom-0 w-full z-20">
  {/* Rounded inward dip in top border */}
     <img src={bg_nav} alt="curve" className='absolute top-0 w-full h-full object-cover'/>

  <ul className="relative w-full flex items-center justify-between p-6">
    <li onClick={() => handleClick({ id: 'home', path: '/store-owner/:userId/dashboard' })}>
      <GoHome className={`${active === 'home' ? 'text-primary' : ''} w-8 h-8 cursor-pointer`} />
    </li>
    <li onClick={() => handleClick({ id: 'store', path: '/store-owner/:userId/store' })}>
      <PiShoppingCartBold className={`${active === 'store' ? 'text-primary' : ''} w-8 h-8 cursor-pointer`} />
    </li>

    {/* Floating Add Button */}
    <li onClick={() => handleClick({ id: 'add', path: '/store-owner/:userId/add-product' })} className="flex items-center justify-center mr-1">
      <div className="absolute -top-8 p-3 text-white bg-dark-blue shadow-lg rounded-full cursor-pointer z-50">
        <MdAdd className={`w-8 h-8`} />
      </div>
    </li>

    <li onClick={() => handleClick({ id: 'chats', path: '/store-owner/:userId/chats' })}>
      <MdOutlineMarkUnreadChatAlt className={`${active === 'chats' ? 'text-primary' : ''} w-8 h-8 cursor-pointer`} />
    </li>
    <li onClick={() => handleClick({ id: 'profile', path: '/store-owner/:userId/profile' })}>
      <BsPerson className={`${active === 'profile' ? 'text-primary' : ''} w-8 h-8 cursor-pointer`} />
    </li>
  </ul>
</nav>

  )
}

export default StoreOwnerNav;
