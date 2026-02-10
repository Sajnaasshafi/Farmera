import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getFarmerOrderCounts } from "../../api/api";

const OrdersTrend = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const res = await getFarmerOrderCounts();

        const total = res.totalOrders || 0;

        // Display as weekly flat trend
        setData([
          { day: "Mon", orders: total },
          { day: "Tue", orders: total },
          { day: "Wed", orders: total },
          { day: "Thu", orders: total },
          { day: "Fri", orders: total },
          { day: "Sat", orders: total },
          { day: "Sun", orders: total },
        ]);
      } catch (error) {
        console.error("Orders trend error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalOrders();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <p className="text-sm text-gray-500">Loading orders trend...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Orders This Week
      </h3>

      {data.every((d) => d.orders === 0) ? (
        <p className="text-sm text-gray-500 text-center mt-10">
          No orders yet
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#14532d"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default OrdersTrend;
