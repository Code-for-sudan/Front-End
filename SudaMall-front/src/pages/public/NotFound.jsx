import React from "react";
import { notfound1 , notfound2 ,notfound3 } from "../../assets/icons/index";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      {/* صورة المتصفح أعلى الصفحة */}
      <div className="mr-28">
      <img
        src={notfound1} // Adjust the path as necessary
        alt="browser"
        className="w-28 md:w-36 mb-2"
      />

      {/* فقاعة oops! */}
      <img
        src={notfound2} // Using the imported icon
        alt="oops"
        className="w-16 md:w-20 mb-1"
      />
      </div>

      {/* الرقم والنص */}
      <h1 className="text-6xl font-bold text-black">404</h1>
      <p className="mt-2 text-gray-600 text-lg">عذرًا الصفحة غير متاحة</p>

      {/* صورة الكود أسفل النص */}
      <img
        src={notfound3}
        alt="code"
        className="w-32 md:w-40 mt-4 ml-30"
      />
    </div>
  );
};

export default NotFound;
