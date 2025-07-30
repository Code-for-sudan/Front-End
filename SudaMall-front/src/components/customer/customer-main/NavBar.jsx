import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

function NavBar({ title }) {
  return (
    <div className="pt-8 px-6 flex items-center justify-between">
        <p className='text-xl text-black'>{title}</p>
        <FaArrowLeft  className='text-2xl text-black cursor-pointer' />
    </div>
  )
}

export default NavBar