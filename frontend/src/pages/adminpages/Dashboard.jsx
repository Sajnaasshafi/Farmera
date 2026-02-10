import React from 'react'
import Sidebar from '../../components/admincomponent.jsx/Sidebar'
import Dashboardheader from '../../components/admincomponent.jsx/Dashboardheader'
import FarmerBuyerChart from '../../components/admincomponent.jsx/FarmerBuyerChart'
import HarvestComparisonChart from '../../components/admincomponent.jsx/HarvestComparisonChart'
import PlatformActivityChart from '../../components/admincomponent.jsx/PlatformActivityChart'

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex bg-green-50">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">

        
        <div className="sticky top-0 z-50 bg-white">
          <Dashboardheader />
        </div>

        
        <div className="p-6">
          <div className="bg-white rounded-lg p-6 shadow-sm min-h-[300px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

  {/* Row 1 – Two charts */}
  <FarmerBuyerChart />
  <HarvestComparisonChart />
  

  {/* Row 2 – Centered donut */}
  <div className="lg:col-span-2 flex justify-center">
    <div className="w-full max-w-md">
      <PlatformActivityChart />
    </div>
  </div>

</div>
          </div>
        </div>

      </div>
    </div>
  )
}



export default Dashboard