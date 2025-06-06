import React from "react";

const WelcomeScreen = ({ image, text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <img src={image} alt="Welcome" className="w-64 h-64 object-contain mb-4" />
      <p className="text-lg text-gray-700">{text}</p>
    </div>
  );
};

export default WelcomeScreen;
