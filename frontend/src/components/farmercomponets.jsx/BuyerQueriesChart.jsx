import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getFarmerQueries } from "../../api/api";

const BuyerQueriesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const farmerId = localStorage.getItem("id");
        const res = await getFarmerQueries(farmerId);

        const queries = res.queries;

        // Initialize days
        const daysMap = {
          Mon: 0,
          Tue: 0,
          Wed: 0,
          Thu: 0,
          Fri: 0,
          Sat: 0,
          Sun: 0,
        };

        // Count queries per day
        queries.forEach((q) => {
          const day = new Date(q.createdAt).toLocaleDateString("en-US", {
            weekday: "short",
          });
          if (daysMap[day] !== undefined) {
            daysMap[day]++;
          }
        });

        // Convert to recharts format
        const chartData = Object.keys(daysMap).map((day) => ({
          day,
          queries: daysMap[day],
        }));

        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch queries:", error);
      }
    };

    fetchQueries();
  }, []);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Buyer Queries (This Week)
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="queries" fill="#14532d" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BuyerQueriesChart;
