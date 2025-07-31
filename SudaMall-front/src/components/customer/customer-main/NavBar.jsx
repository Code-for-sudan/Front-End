import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { ArrowCircleRightR } from '../../../assets';

function NavBar({ title, isFavorite = false }) {
  return (
    <div className="pt-8 px-6 flex items-center justify-between">
        <img src={ArrowCircleRightR}  className='text-3xl size-8 text-black cursor-pointer' />
        <p className='text-xl text-black'>{title}</p>
        <div className='text-3xl'>
            {isFavorite ? <MdFavorite/> : <MdFavoriteBorder/>}
        </div>

    </div>
  )
}

export default NavBar