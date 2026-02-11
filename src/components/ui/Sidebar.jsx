import React from 'react'

const Sidebar = ({header,items=[]}) => {
   return (
    <div className="w-56 bg-gray-100 h-full p-4 shadow-md">
      <h2 className="font-bold mb-4">{header}</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-sm">
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar