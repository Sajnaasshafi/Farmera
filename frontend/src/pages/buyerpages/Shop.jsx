import React from "react";
import { Outlet } from "react-router-dom"
import Navbar from "../../components/buyercomponent.jsx/Navbar";
import Shoptabs from "../../components/buyercomponent.jsx/shoptabs";

const Shop = () => {
  return (
    <div className="w-screen h-screen flex bg-green-50">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white">
          <Navbar />
        </div>

        
        <div className="sticky top-16 z-40 bg-green-50 px-6 pt-4">
          <Shoptabs />
        </div>

        
        <div className="p-6">
          <div className="bg-white rounded-lg p-6 shadow-sm min-h-[300px]">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Shop;
