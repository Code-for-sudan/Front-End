import React from "react";

const WelcomeDots = ({ total, current }) => {
  return (
    <div className="flex flex-row-reverse justify-center gap-2 mt-6">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${
            index === current ? "bg-dark-blue" : "bg-light-gray"
          }`}
        />
      ))}
    </div>
  );
};

export default WelcomeDots;
