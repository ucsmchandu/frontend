import React from 'react'

const Card = ({title,children}) => {
 return (
    <div className="bg-white shadow-md rounded-xl p-4 w-64">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}

export default Card