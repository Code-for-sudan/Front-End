import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { closeMenu, SelectOpenMenu } from '../../app/AppStats';
import { useDetectOutside } from '../../hooks';
import { Store_Owner_Sidebar } from '../../constants';
import { Link } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { profile_pic } from '../../assets';

const Menu = ({ userData }) => {
  const dispatch = useDispatch();
  const MenuOpened  = useSelector(SelectOpenMenu);

  const ref = useRef(null);

   // Detect clicks outside the menu
   useDetectOutside({
    ref,
    callback: () => {
      if (MenuOpened) {
        dispatch(closeMenu());
      }
    },
  });

    // Handle click item
    const handleClick = () => {
        dispatch(closeMenu());
    }

  return (
    <div 
      className={`fixed inset-0 bg-black/50 w-full h-screen opacity-100 z-[250] ${
            MenuOpened
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}>
       <div
          ref={ref}
          className={`flex flex-col gap-2 bg-light-gray duration-500 h-full overflow-y-scroll max-w-[70vw] w-full ${
                MenuOpened
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-100"
          }`}
        >
        <div className="flex items-center gap-4 py-6 px-8 bg-white">
            <img src={userData?.profile_picture || profile_pic } alt="profile" className='w-12 h-12 rounded-full' />
            <p className='font-semibold text-base'>{userData?.first_name}</p>
        </div>
        <ul className="flex flex-col gap-6 py-6 px-8 bg-white">
          { Store_Owner_Sidebar.map((item, i) =>
            <li 
                key={i}
                onClick={handleClick}
                >
                <Link 
                    to={item.path}
                    className='flex items-center gap-4'>
                    <img src={item.icon} alt="icon" />
                    <p className='font-semibold text-base text-gray-700'>{item.label}</p>
                </Link>
            </li>)}
        </ul>
        <div className="py-6 px-8 bg-white">
            <button
                className='flex items-center gap-4 cursor-pointer'
                >
                <MdLogout className="w-6 h-6 text-red-700"/>
                <p className='font-semibold text-base text-gray-600'>تسجيل الخروج</p>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Menu
