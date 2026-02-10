import React, { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import Farmermanagmentheader from "../../components/admincomponent.jsx/Farmermanagmentheader";
import Sidebar from "../../components/admincomponent.jsx/Sidebar";
import { Farmermanage } from "../../api/api";

const Farmermanagment = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH FARMERS ================= */
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const data = await Farmermanage();
        setFarmers(data);
      } catch (err) {
        console.error("Failed to fetch farmers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white">
          <Farmermanagmentheader />
        </div>

        <div className="p-6">
          <div className="bg-white rounded-lg p-6 shadow-sm min-h-[300px]">

            <div className="min-h-screen bg-gradient-to-b from-green-100 via-green-200 to-amber-200 p-8">
              <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-green-900/20">

                {/* HEADER */}
                <div className="p-6 border-b border-green-900/20 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-green-900">
                    Farmers
                  </h2>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                  {loading ? (
                    <p className="p-6 text-center">Loading farmers...</p>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="bg-green-900/10 text-green-950">
                        <tr>
                          <th className="px-6 py-4 text-left">#</th>
                          <th className="px-6 py-4 text-left">Farmer</th>
                          <th className="px-6 py-4 text-left">Farm</th>
                          <th className="px-6 py-4 text-left">Contact</th>
                          <th className="px-6 py-4 text-center">Orders</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-green-900/10">
                        {farmers.map((farmer, index) => (
                          <tr
                            key={farmer._id}
                            className="hover:bg-green-100/40 transition"
                          >
                            {/* ID */}
                            <td className="px-6 py-4 font-medium">
                              {index + 1}
                            </td>

                            {/* NAME + IMAGE */}
                            <td className="px-6 py-4 flex items-center gap-3">
                              <img
                                src={farmer.farmerimage || "/avatar.png"}
                                alt={farmer.name}
                                className="w-10 h-10 rounded-full border border-green-900/30 object-cover"
                              />
                              <span className="font-semibold text-green-950">
                                {farmer.name}
                              </span>
                            </td>

                            {/* FARM DETAILS */}
                            <td className="px-6 py-4">
                              <div className="font-medium">
                                {farmer.farmname || "—"}
                              </div>
                              <div className="text-xs text-green-800">
                                {farmer.farmlocation || ""}
                              </div>
                            </td>

                            {/* CONTACT */}
                            <td className="px-6 py-4">
                              <div className="text-green-950">
                                <div>{farmer.email}</div>
                                <div className="text-sm text-green-800">{farmer.phonenumber}</div>
                              </div>
                            </td>

                            {/* ORDER COUNT */}
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full bg-green-900 text-white">
                                {farmer.totalOrders}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmermanagment;
