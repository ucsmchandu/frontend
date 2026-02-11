import React from 'react'

const Sidebar = () => {
  return (
    <div className="w-48 bg-gray-100 h-full p-4 shadow-md">
      <ul className="space-y-2">
        <li className="font-medium">Dashboard</li>
        <li>Settings</li>
        <li>Profile</li>
      </ul>
    </div>
  );
}

export default Sidebar