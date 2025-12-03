import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`w-full bg-white text-indigo-700 font-semibold py-2 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
