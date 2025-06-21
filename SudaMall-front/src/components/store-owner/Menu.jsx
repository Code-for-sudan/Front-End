import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { SelectOpenMenu } from '../../app/AppStats';
import { userData } from '../../data/user';

const Menu = () => {
  const dispatch = useDispatch();
  const MenuOpened  = useSelector(SelectOpenMenu);

  return (
    <div 
      className={`fixed inset-0 bg-black/50 duration-500 w-full h-screen opacity-100 z-[250] ${
            MenuOpened
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-8"
        }`}>
       <div
          className={`flex flex-col gap-2 bg-light-gray duration-500 h-screen max-w-[70vw] w-full ${
                MenuOpened
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-8"
          }`}
        >
        <div className="flex items-center gap-4 p-6 bg-white">
            <img src={userData.profile_pic} alt="profile" className='w-12 h-12 rounded-full' />
            <p className='font-semibold text-xl'>{userData.name}</p>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white"></div>
        <div className="flex items-center gap-4 p-6 bg-white"></div>
      </div>
    </div>
  )
}

export default Menu
