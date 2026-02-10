import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { getAllOrderscount } from "../../api/api";

const PlatformActivityChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const res = await getAllOrderscount();

        console.log("ORDER COUNT 👉", res);

        // assuming backend returns: { totalOrders: 45 }
        setData([
          {
            label: "Total Orders",
            activity: Number(res.totalOrders) || 0,
          },
        ]);
      } catch (err) {
        console.error("Order count error:", err);
      }
    };

    fetchOrderCount();
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm h-full">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">
        Platform Activity
      </h3>

      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="activity"
            stroke="#166534"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlatformActivityChart;
