import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { PiShoppingCartBold } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { bg_nav } from '../../assets';
import { openAddProduct } from '../../app/AppStats';

const StoreOwnerNav = () => {
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

  {
    /**   Hide the footer only on the order details page */
  }
  const isOrderDetailsPage = /\/store-owner\/[^/]+\/orders\/\d+/.test(location.pathname);
  if (isOrderDetailsPage) {
    return null;
  }

  const handleClick = ({ id, path }) => {
    setActive(id);
    navigate(path);
  };

  const handleAddProduct = () => {
    dispatch(openAddProduct());
  };

  return (
    <nav className="fixed bottom-0 w-full z-20">
      {/* Background curve */}
      <img
        src={bg_nav}
        alt="curve"
        className="absolute top-0 w-full h-full object-cover"
      />

      <ul className="relative w-full flex items-center justify-between p-4 text-xs">
        {/* home page button */}
        <li
          className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${
            active === "home" ? "text-primary" : ""
          }`}
          onClick={() =>
            handleClick({ id: "home", path: "/store-owner/:userId/dashboard" })
          }
        >
          <GoHome className="size-6" />
          <p>الرئيسية</p>
        </li>


        {/* store page button */}
        <li
          className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${
            active === "orders" ? "text-primary" : ""
          }`}
          onClick={() =>
            handleClick({
              id: "orders",
              path: "/store-owner/:userId/orders",
            })
          }
        >
          <PiShoppingCartBold className="size-6" />
          <p>الطلبات</p>
        </li>

        {/* Floating Add Button */}
        <li onClick={handleAddProduct} className="flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out">
          <div className="absolute -top-6 p-2 text-white bg-dark-blue shadow-lg rounded-full z-50">
            <MdAdd className="size-8" />
          </div>
        </li>
        {/* navigate to chat page button */}
        <li
          className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${
            active === "chats" ? "text-primary" : ""
          }`}
          onClick={() =>
            handleClick({ id: "chats", path: "/store-owner/:userId/chats" })
          }
        >
          <MdOutlineMarkUnreadChatAlt className="size-6" />
          <p>الدردشة</p>
        </li>
        {/* navigate to profile page button */}
        <li
          className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${
            active === "profile" ? "text-primary" : ""
          }`}
          onClick={() =>
            handleClick({ id: "profile", path: "/store-owner/:userId/profile" })
          }
        >
          <BsPerson className="size-6" />
          <p>حسابي</p>
        </li>
      </ul>
    </nav>
  );
};

export default StoreOwnerNav;
