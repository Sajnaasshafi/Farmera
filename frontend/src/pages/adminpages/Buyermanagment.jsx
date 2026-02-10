import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import Sidebar from "../../components/admincomponent.jsx/Sidebar";
import Buyermanagementheader from "../../components/admincomponent.jsx/Buyermanagementheader";
import { Buyermanage } from "../../api/api"; // your API function

const Buyermanagment = () => {
  const [buyers, setBuyers] = useState([]); // initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch buyers from backend
  useEffect(() => {
  const fetchBuyers = async () => {
    try {
      const data = await Buyermanage();
      setBuyers(data); // guaranteed to be an array
    } catch (err) {
      console.error("Error fetching buyers:", err);
      setError("Failed to load buyers. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  fetchBuyers();
}, []);

  if (loading) {
    return <p className="p-8 text-green-900 font-semibold">Loading buyers...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600 font-semibold">{error}</p>;
  }

  if (buyers.length === 0) {
    return <p className="p-8 text-green-900 font-semibold">No buyers found.</p>;
  }

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white">
          <Buyermanagementheader />
        </div>

        {/* Content */}
        <div className="p-8 bg-gradient-to-b from-green-100 via-green-200 to-amber-200 min-h-screen">
          <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-green-900/20">
            
            {/* Title */}
            <div className="p-6 border-b border-green-900/20">
              <h2 className="text-2xl font-bold text-green-900">Buyers</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-green-900/10 text-green-950">
                  <tr>
                    <th className="px-6 py-4 text-left">ID</th>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Contact</th>
                    <th className="px-6 py-4 text-center">Orders</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-green-900/10">
                  {(buyers || []).map((buyer, index) => (
                    <tr key={buyer._id} className="hover:bg-green-100/40">
                      <td className="px-6 py-4">{index + 1}</td>

                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-lg">
                          {buyer.name ? buyer.name.charAt(0).toUpperCase() : "B"}
                        </div>
                        <span className="font-semibold">{buyer.name}</span>
                      </td>

                      <td className="px-6 py-4">
                        <div>{buyer.phonenumber}</div>
                        <div className="text-xs text-green-800">{buyer.email}</div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-900 text-white">
                          {buyer.totalOrders || 0}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyermanagment;
