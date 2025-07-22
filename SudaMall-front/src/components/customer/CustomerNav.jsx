import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { openAddProduct } from '../../app/AppStats';
import { bg_nav } from '../../assets'
import NavLink from './NavLink'
import { customer_navbar_data } from '../../constants'

const CustomerNav = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");
  const dispatch = useDispatch();


  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/dashboard")) {
      setActive("home");
    } else if (path.includes("/orders")) {
      setActive("orders");
    } else if (path.includes("/add-product")) {
      setActive("add");
    } else if (path.includes("/chats")) {
      setActive("chats");
    } else if (path.includes("/profile")) {
      setActive("profile");
    }  
  }, [location]);

  const handleClick = (id, path) => {
    // when clicking icons logic
    setActive(id);
    navigate(path);
  }


  const isOrderDetailsPage = /\/store-owner\/[^/]+\/orders\/\d+/.test(location.pathname);
  if (isOrderDetailsPage) {
    return null;
  }

  return (
    <nav className='fixed bottom-0 w-full z-20'>
      {/* the curve in the middle */}
      <img 
        src={bg_nav}
        alt='curve'
        className='absolute top-0 max-sm:top-[-20px] w-full h-full object-cover'
      />

      <ul className='relative w-full flex items-center justify-between p-4 text-xs'>
        {customer_navbar_data.map((link) => (
          <NavLink
            key={link.id}
            Icon={link.icon}
            iconSize="6"
            title={link.title}
            id={link.id}
            path={link.path}
            active={active}
            setActive={setActive}
            navigate={navigate}
          />
        ))}
      </ul>

    </nav>
  )
}

export default CustomerNav
