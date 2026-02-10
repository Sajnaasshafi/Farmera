import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getFarmerOrderCounts } from "../../api/api";

const CropSalesChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await getFarmerOrderCounts();

        setData([
          {
            name: "Harvested Orders",
            value: res.harvestedOrders || 0,
          },
          {
            name: "Future Harvest Orders",
            value: res.futureHarvestOrders || 0,
          },
        ]);
      } catch (error) {
        console.error("Pie chart order count error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <p className="text-sm text-gray-500">Loading chart...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Order Distribution
      </h3>

      {data.every((d) => d.value === 0) ? (
        <p className="text-sm text-gray-500 text-center mt-10">
          No orders yet
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              fill="#166534"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CropSalesChart;
