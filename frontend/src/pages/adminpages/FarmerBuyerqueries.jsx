import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admincomponent.jsx/Sidebar";
import Querymanagementheader from "../../components/admincomponent.jsx/Querymanagementheader";
import { getAllQueries } from "../../api/api";

const FarmerBuyerqueries = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const data = await getAllQueries();
        setQueries(data.queries);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white">
          <Querymanagementheader />
        </div>

        <div className="p-6">
          <div className="bg-white rounded-lg p-6 shadow-sm min-h-[300px]">
            {loading ? (
              <p className="text-center text-gray-500">Loading queries...</p>
            ) : queries.length === 0 ? (
              <p className="text-center text-gray-500">No queries found</p>
            ) : (
              <div className="space-y-6">
                {queries.map((q) => (
                  <div
                    key={q._id}
                    className="bg-white rounded-2xl border border-green-900/20 shadow-sm p-6"
                  >
                    {/* QUERY HEADER */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-900">
                        {q.buyerId?.name?.charAt(0)}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-green-950">
                            {q.buyerId?.name}
                          </h3>
                          <span className="text-sm text-green-700">
                            {new Date(q.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <p className="mt-2 text-green-900 text-sm">
                          {q.question}
                        </p>
                      </div>
                    </div>

                    {/* ✅ REPLY SECTION — FIXED */}
                    {q.reply && q.reply.trim() !== "" && (
  <div className="mt-5 ml-16 p-4 bg-green-50 rounded-xl border border-green-900/10">
    <div className="flex justify-between items-center">
      <span className="text-sm font-semibold text-green-900">
        Replied by {q.farmerId?.name || "Farmer"}
      </span>
      <span className="text-xs text-green-700">
        {new Date(q.updatedAt).toLocaleString()}
      </span>
    </div>

    <p className="mt-2 text-sm text-green-900">
      {q.reply}
    </p>
  </div>
)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerBuyerqueries;
