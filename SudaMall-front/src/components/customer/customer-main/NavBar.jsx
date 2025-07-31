import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { ArrowCircleRightR } from '../../../assets';
import { useNavigate } from 'react-router-dom';

function NavBar({ title, isFavorite = false, handleFavoriteToggle }) {


  const navigate = useNavigate()

  // navigate to previous page

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="pt-8 px-6 flex items-center justify-between">
        <img 
          onClick={() => handleBack()}
          src={ArrowCircleRightR}  
          className='text-3xl size-8 text-black cursor-pointer'

        />
        <p className='text-xl text-black'>{title}</p>
        <div 
          onClick={() => handleFavoriteToggle(!isFavorite)}
          className='text-3xl'>
            {isFavorite ? <MdFavorite className='text-[#FCA311]'/> : <MdFavoriteBorder className='text-[#FCA311CC]'/>}
        </div>

    </div>
  )
}

export default NavBar