import React from 'react'

const Card = ({title,content,description}) => {
 return (
    <div className="bg-white shadow-md rounded-xl p-4 w-64">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{content}</p>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
  );
}

export default Card