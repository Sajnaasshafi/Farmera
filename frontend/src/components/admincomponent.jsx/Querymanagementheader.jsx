import React from 'react'
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";

const Querymanagementheader = () => {

    
  return (
    <div>
          <div className="sticky top-0 z-50
                    flex items-center
                    bg-white font-mono
                    h-16 border-b
                    w-full px-8 py-5">
                    
                    {/* Left icon */}
                    <IoChatbubbleOutline className="text-xl" />
              
                    {/* Title */}
                    <h1 className="text-2xl ml-4 font-semibold">
                      Farmer-Buyer Queries
                    </h1>
              
                    {/* Push notification to right */}
                    <IoNotifications className="ml-auto text-xl cursor-pointer" />
                  </div>
        </div>
      )
    }

export default Querymanagementheader