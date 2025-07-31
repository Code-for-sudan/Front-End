import React from 'react'
import { CiSettings } from 'react-icons/ci'
import { IoNotifications } from "react-icons/io5";

function TopNavbar() {
  return (
    <div className="pt-8 px-6 flex items-center justify-between">
        <CiSettings className="text-2xl text-black cursor-pointer" />
        <IoNotifications className="text-2xl text-black cursor-pointer"/>
    </div>
  )
}

export default TopNavbar