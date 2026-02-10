import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getAllOrderscount } from "../../api/api";

const COLORS = ["#166534", "#84cc16"];

const HarvestComparisonChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await getAllOrderscount();

        // 🔍 IMPORTANT: handle both response styles
        const harvested =
          res?.harvestedOrders ??
          res?.data?.harvestedOrders ??
          0;

        const future =
          res?.futureHarvestOrders ??
          res?.data?.futureHarvestOrders ??
          0;

        // 🚨 Recharts won't render if both are 0
        if (harvested === 0 && future === 0) {
          setData([
            { name: "Harvested", value: 1 },
            { name: "Future Harvest", value: 0 },
          ]);
        } else {
          setData([
            { name: "Harvested", value: harvested },
            { name: "Future Harvest", value: future },
          ]);
        }
      } catch (error) {
        console.error("Harvest comparison chart error:", error);
      }
    };

    fetchCounts();
  }, []);

  // ⏳ Prevent rendering before data exists
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm h-full">
      <h3 className="text-sm text-center font-semibold mb-2 text-gray-700">
        Harvest Status
      </h3>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={50}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-4 mt-2 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-800 rounded-full"></span>
          Harvested
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-lime-500 rounded-full"></span>
          Future
        </span>
      </div>
    </div>
  );
};

export default HarvestComparisonChart;
