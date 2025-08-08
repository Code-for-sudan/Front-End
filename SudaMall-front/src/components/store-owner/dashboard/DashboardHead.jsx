import React from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { openMenu } from '../../../app/AppStats';
import { profile_pic } from '../../../assets';
const DashboardHead = ({ userData }) => {
    const dispatch = useDispatch();

    // open menu
    const OpenMenu = () => {
        dispatch(openMenu());
    }

  return (
    <div className='flex flex-row-reverse items-center justify-between py-4'>
      <div>
        <img src={userData?.profile_picture || profile_pic } alt="profile" className='w-12 h-12 rounded-full' />
      </div>
      <div className='flex flex-row-reverse items-center gap-4'>
        <button className='relative cursor-pointer'>
            <IoNotificationsOutline className='w-6 h-6' />
            <div className='absolute top-0 right-1 border border-white w-2 h-2 bg-red-600 rounded-full' />
        </button>
        <button 
            onClick={OpenMenu}
            className='cursor-pointer'>
            <MdMenu className='w-8 h-8' />
        </button>
      </div>
    </div>
  )
}

export default DashboardHead;
