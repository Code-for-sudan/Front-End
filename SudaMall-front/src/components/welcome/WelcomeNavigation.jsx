import React from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const WelcomeNavigation = ({ onNext, onSkip }) => {
  return (
    <div className="absolute bottom-0 w-full flex justify-between items-center p-4 pt-8 mt-8 overflow-hidden">
      <button
        onClick={onNext}
        className="p-2 text-white cursor-pointer z-10"
      >
        <MdOutlineArrowCircleRight className="w-5 h-5" />
      </button>
      <button className="text-gray-500 cursor-pointer" onClick={onSkip}>
        تخطي
      </button>
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary rounded-full" />
    </div>
  );
};

export default WelcomeNavigation;
