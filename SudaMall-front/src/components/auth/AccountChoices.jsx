import React from 'react'
import { people } from '../../assets'
import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const AccountChoices = ({ onClickBack }) => {
  const navigate = useNavigate();

  // go to customer sign up
  const handleCustomer = () => {
    navigate("/auth/signup");
  }

  // go to store owner sign up
  const handleStoreOwner = () => {
    navigate("/auth/signup");
  }
  return (
    <div className="h-screen justify-between bg-white relative">

    {/* back button */}
    <button 
      onClick={onClickBack}
      className='absolute top-10 left-6'>
      <MdOutlineArrowCircleLeft className='w-8 h-8' />
    </button>
<div className='w-full flex flex-col justify-end items-center absolute bottom-0'>
    {/* Image on top */}
    <img src={people} alt="Welcome" className="w-[80vw] max-h-[40%] object-contain" />
    {/* Gradient and content */}
   <div className="w-full bg-gradient-to-t from-primary via-primary/90 to-primary/10 h-[60vh] p-10 rounded-t-[6rem] flex flex-col justify-center gap-12 z-20">
    <div className='flex flex-col'>
        <p className="text-3xl font-semibold">يرجى تحديد نوع الحساب الذي ترغب بإنشاءه</p>
      </div>
      <div className="flex flex-col gap-4 w-full text-sm">
        <button
        onClick={handleCustomer}
        className="bg-white text-primary font-bold py-2 rounded-xl w-full"
        >
         مشتري
        </button>
        <button
        onClick={handleStoreOwner}
        className="text-white border font-bold py-2 rounded-xl w-full"
        >
          بائع
        </button>
      </div>
      </div>
    </div>
</div>
  )
}

export default AccountChoices
