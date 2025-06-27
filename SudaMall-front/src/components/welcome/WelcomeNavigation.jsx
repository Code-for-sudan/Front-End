import React from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const WelcomeNavigation = ({ onNext, onSkip }) => {
  return (
    <div className="fixed bottom-0 w-full flex justify-between items-center p-4 pt-12 mt-8 overflow-hidden">
      <button
        onClick={onNext}
        className="p-2 text-white cursor-pointer active:scale-90 z-10"
      >
        <MdOutlineArrowCircleRight className="w-8 h-8" />
      </button>
      <button className="text-lg font-bold text-gray-500 cursor-pointer" onClick={onSkip}>
        تخطي
      </button>
      
      {/* bottom circle style */}
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary rounded-full" />
    </div>
  );
};

export default WelcomeNavigation;
