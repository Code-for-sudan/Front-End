import React from 'react'
import { useNavigate } from 'react-router-dom'

const CustomerNav = () => {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  console.log(userId)
  const navigate = useNavigate();
  const handleNavigate =() => {
    navigate(`/customer/${userId}/chats`)
  }
  return (
    <div>
      customer navbar
      <button
        onClick={handleNavigate}
        className='py-1 px-4 border border-primary rounded text-primary'>
        go to chats
      </button>
    </div>
  )
}

export default CustomerNav
