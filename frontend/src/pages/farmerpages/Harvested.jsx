import React from 'react'
import { Outlet } from "react-router-dom"
import Sidebar from '../../components/farmercomponets.jsx/Sidebar'
import Harvestedheader from '../../components/farmercomponets.jsx/Harvestedheader'
import Harvestedtab from '../../components/farmercomponets.jsx/Harvestedtab'

const Harvested = () => {
  return (
    <div className="w-screen h-screen flex bg-green-50">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">

        
        <div className="sticky top-0 z-50 bg-white">
          <Harvestedheader />
        </div>

        
        <div className="sticky top-16 z-40 bg-green-50 px-6 pt-4">
          <Harvestedtab />
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

export default Harvested
