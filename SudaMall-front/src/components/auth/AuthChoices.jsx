import React from 'react'
import { people } from '../../assets'
import { useNavigate } from 'react-router-dom'

const AuthChoices = ({ handleNext }) => {
  const navigate = useNavigate();

  // navigate to sign in page
  const handleSignin = () => {
    navigate("/auth/login")
  }
  return (
    <div className="h-screen bg-white relative overflow-x-hidden">
    <div className='w-full flex flex-col justify-end items-center absolute bottom-0'>
    {/* Image on top */}
    <img src={people} alt="Welcome" loading='eager' className="w-[80vw] max-h-[40%] object-contain" />
    {/* Gradient and content */}
   <div className="w-[105%] bg-gradient-to-t from-primary via-primary/90 to-primary/10 h-[60vh] p-10 rounded-t-[6rem] flex flex-col justify-center gap-12 z-20">
    <div className='flex flex-col'>
        <p className="text-xl font-semibold">هيا بنا</p>
        <p className="text-xl font-semibold">إبدأ تجربتك الآن!</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <button
        onClick={handleSignin}
        className="bg-white text-primary font-bold py-2 rounded-xl w-full"
        >
          تسجيل الدخول
        </button>
        <button
        onClick={handleNext}
        className="text-white border font-bold py-2 rounded-xl w-full"
        >
          إنشاء حساب
        </button>
      </div>
      </div>
    </div>
  </div>
  )
}

export default AuthChoices
