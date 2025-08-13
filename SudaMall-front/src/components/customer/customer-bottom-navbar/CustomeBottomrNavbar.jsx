import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { openAddProduct } from '../../../app/AppStats';
import { bg_nav } from '../../../assets'
import NavLink from './NavLink'
import { customer_navbar_data } from '../../../constants'
import ShoppingBasket from './ShoppingBasket';

const CustomeBottomrNavbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");


  useEffect(() => {
    const path = location.pathname;

    if (path.includes("/dashboard")) {
      setActive("home");
    } else if (path.includes("/favorite")) {
      setActive("favorite");
    } else if (path.includes("/shopping-card")) {
      setActive("shopping-card");
    } else if (path.includes("/chats")) {
      setActive("chats");
    } else if (path.includes("/profile")) {
      setActive("profile");
    } 
  }, [location]);


  const handleClick = ({ id, path }) => {
    // when clicking icons logic
    setActive(id);
    navigate(path);
  }
  
  const isOrderDetailsPage = /\/store-owner\/[^/]+\/orders\/\d+/.test(location.pathname);
  if (isOrderDetailsPage) {
    return null;
  }

  

  return (
    <nav className='w-full relative'>
      {/* the curve in the middle */}
      <img 
        src={bg_nav}
        alt='curve'
        className='absolute top-0 max-sm:top-[-12px] w-full h-full object-cover'
      />

      <ul className='relative w-full flex flex-row items-center justify-center py-5 text-xs'>
        {customer_navbar_data.map((link, index) => {
          
          return (
            <Fragment key={link.id}>
              
              {/* Shopping card icon `middle icon` */}
              {index === 2 && (
                <>
                <li className="w-1/2" />
                <ShoppingBasket 
                  key="shopping-basket" 
                  id="shopping-card"
                  path="/customer/:userId/shopping-card"
                  handleClick={handleClick}
                  iconSize={6}
                  />
                  <li className="w-1/2" />
                  </>
              )}

              {/* bottom Navbar links */}
              <NavLink
                Icon={link.icon}
                iconSize="6"
                title={link.title}
                id={link.id}
                path={link.path}
                active={active}
                handleClick={handleClick}
              />
            
            </Fragment>
     

          )

        })}
      </ul>

    </nav>
  )
}

export default CustomeBottomrNavbar
