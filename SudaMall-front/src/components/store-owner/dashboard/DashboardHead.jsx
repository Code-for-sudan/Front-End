import React from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { openMenu } from '../../../app/AppStats';
import { userData } from '../../../data/user';  // this will be deleted after connecting with backend

const DashboardHead = () => {
    const dispatch = useDispatch();

    // open menu
    const OpenMenu = () => {
        dispatch(openMenu());
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
            onClick={OpenMenu}
            className='cursor-pointer'>
            <MdMenu className='w-8 h-8' />
        </button>
      </div>
    </div>
  )
}

export default DashboardHead;
