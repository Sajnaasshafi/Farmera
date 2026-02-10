import React, { useEffect, useState } from "react";
import {
  Package,
  TrendingUp,
  MessageCircle,
  CloudSun,
} from "lucide-react";
import { GiWheat } from "react-icons/gi";

import Sidebar from "../../components/farmercomponets.jsx/Sidebar";
import Dashboardheader from "../../components/farmercomponets.jsx/Dashboardheader";

import OrdersTrend from "../../components/farmercomponets.jsx/OrdersTrend";
import CropSalesChart from "../../components/farmercomponets.jsx/CropSalesChart";
import BuyerQueriesChart from "../../components/farmercomponets.jsx/BuyerQueriesChart";
import { getFarmerOrderCounts } from "../../api/api";



/* ---------------- STAT CARD ---------------- */
const ChartStatCard = ({
  icon: Icon,
  title,
  value,
  status,
  statusColor,
  children,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
      <div className="flex justify-between items-center">
        <div className={`p-3 rounded-xl ${statusColor}`}>
          {Icon && <Icon size={20} className="text-white" />}
        </div>

        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {status}
        </span>
      </div>

      <h3 className="mt-4 text-gray-600">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>

      <div className="mt-4">{children}</div>
    </div>
  );
};

/* ---------------- DASHBOARD ---------------- */
const Dashboard = () => {

  // const [orderCount, setOrderCount] = useState(0);
  const [ counts, setCounts ] = useState({
    futureHarvestOrders: 0,
  harvestedOrders: 0,
  totalOrders: 0,
});

  useEffect(() => {
  getFarmerOrderCounts().then(setCounts);
}, []);


  /* ✅ STATE INITIALIZED DIRECTLY (NO useEffect) */
  const [farmer] = useState(() => ({
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    farmname: localStorage.getItem("farmname") || "",
    farmerimage: localStorage.getItem("farmerimage") || "",
  }));

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white">
          <Dashboardheader
            name={farmer.name}
            farmname={farmer.farmname}
            farmerimage={farmer.farmerimage}
          />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">
            Welcome back, {farmer.name} 👋
          </h1>

          <div className="bg-gradient-to-r from-green-700 to-amber-700 text-white rounded-2xl p-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <CloudSun size={28} />
              </div>

              <div>
                <h2 className="font-semibold text-lg">Today's Conditions</h2>
                <p className="text-sm mt-1">
                  Partly cloudy, 24°C · Humidity: 65%
                </p>
                <p className="text-sm opacity-90">
                  Perfect weather for harvesting!
                </p>
              </div>
            </div>

            <div className="bg-white/20 rounded-xl px-4 py-3">
              💡 Check soil moisture before harvesting wheat
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <ChartStatCard
              icon={Package}
              title="Total Orders"
              value={counts.totalOrders}
              status="Active"
              statusColor="bg-green-700"
            />

            <ChartStatCard
              icon={TrendingUp}
              title="Pre-Orders"
              value= {counts.futureHarvestOrders}
              status="Upcoming"
              statusColor="bg-amber-700"
            />

            <ChartStatCard
              icon={GiWheat}
              title="Harvested-Orders"
              value= {counts.harvestedOrders}
              status="New"
              statusColor="bg-green-800"
            />

            <OrdersTrend />
            <CropSalesChart />
            <BuyerQueriesChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
