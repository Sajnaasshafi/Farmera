import React from 'react'
import { RiPlantFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";

const Harvestedheader = () => {
  return (
    <div className="sticky top-0 z-50
      flex items-center
      bg-white font-mono
      h-16 border-b
      w-full px-8 py-5">
      
      {/* Left icon */}
      <RiPlantFill className="text-xl" />

      {/* Title */}
      <h1 className="text-2xl ml-4 font-semibold">
        Harvested Crops
      </h1>

      {/* Push notification to right */}
      <IoNotifications className="ml-auto text-xl cursor-pointer" />
    </div>
  )
}

export default Harvestedheader
