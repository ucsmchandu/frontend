import React from "react";
const Button=({ label, onClick })=> {
  return (
    <button
      onClick={onClick}
      className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
}

export default Button;
