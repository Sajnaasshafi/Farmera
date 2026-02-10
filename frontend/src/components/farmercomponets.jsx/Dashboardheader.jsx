import React from 'react'
import { IoNotifications } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";

const Dashboardheader = () => {
  return (
    <div className="sticky top-0 z-50
          flex items-center
          bg-white font-mono
          h-16 border-b
          w-full px-8 py-5">
          
          {/* Left icon */}
          <MdOutlineDashboard className="text-xl" />
    
          {/* Title */}
          <h1 className="text-2xl ml-4 font-semibold">
            Dashboard
          </h1>
    
          {/* Push notification to right */}
          <IoNotifications className="ml-auto text-xl cursor-pointer" />
        </div>
      )
    }
    
export default Dashboardheader