import React from 'react'

const Input = ({placeholder}) => {
  return (
    <input
      placeholder={placeholder}
      className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default Input