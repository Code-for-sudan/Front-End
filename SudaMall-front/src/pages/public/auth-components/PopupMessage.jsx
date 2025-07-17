import React from "react";

const PopupMessage = ({ show, icon, title, message}) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(229, 229, 229, 0.6)" }}
    >
      <div className="bg-white text-black text-center px-6 py-4 rounded-lg shadow-xl w-[280px] relative">
        {icon && <img src={icon} alt="Icon" className="mx-auto mb-3 h-10 w-10" />}
        {title && <p className="text-base font-semibold mb-1">{title}</p>}
        {message && <p className="text-sm text-gray-600 leading-snug">{message}</p>}

      </div>
    </div>
  );
};

export default PopupMessage;
