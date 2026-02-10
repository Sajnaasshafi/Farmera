import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getUsercount } from "../../api/api";

const FarmerBuyerChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await getUsercount();

        console.log("USER COUNTS RESPONSE 👉", res); // 🔥 CHECK THIS

        setData([
          {
            name: "Users",
            farmers: Number(res.farmers) || 0,
            buyers: Number(res.buyers) || 0,
          },
        ]);
      } catch (err) {
        console.error("Farmer/Buyer chart error:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm h-full">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">
        Farmers vs Buyers
      </h3>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="farmers" fill="#166534" radius={[4, 4, 0, 0]} />
          <Bar dataKey="buyers" fill="#b45309" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FarmerBuyerChart;
