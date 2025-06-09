// resources/src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, onClick, className = "", variant = "default", type = "button" }) => {
  const baseStyles =
    "px-4 py-2 rounded-2xl text-white font-semibold transition duration-200";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700",
    destructive: "bg-red-600 hover:bg-red-700",
    outline: "bg-white text-black border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
