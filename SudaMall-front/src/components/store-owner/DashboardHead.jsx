import React from 'react'
import { userData } from '../../data/user';
import { IoNotificationsOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../../app/AppStats';

const DashboardHead = () => {
    const dispatch = useDispatch();

    // toggle menu
    const ToggleMenu = () => {
        dispatch(toggleMenu());
    }

  return (
    <div className='flex flex-row-reverse items-center justify-between py-4'>
      <div>
        <img src={userData.profile_pic} alt="profile" className='w-12 h-12 rounded-full' />
      </div>
      <div className='flex flex-row-reverse items-center gap-4'>
        <button className='cursor-pointer'>
            <IoNotificationsOutline className='w-6 h-6' />
        </button>
        <button 
            onClick={ToggleMenu}
            className='cursor-pointer'>
            <MdMenu className='w-8 h-8' />
        </button>
      </div>
    </div>
  )
}

export default DashboardHead;
