import React from 'react'

const Modal = ({title}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p>Modal Content</p>
      </div>
    </div>
  );
}

export default Modal