import React, { useEffect, useState } from "react";
import Navbar from "../../components/buyercomponent.jsx/Navbar";
import { getBuyerQueries } from "../../api/api";
import toast from "react-hot-toast";

const Myquery = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const buyerId = localStorage.getItem("id");
        if (!buyerId) {
          toast.error("Please login first");
          return;
        }

        const res = await getBuyerQueries(buyerId);
        setQueries(res.queries || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load queries");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading queries...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm min-h-[300px]">
          <div className="space-y-6">

            {queries.length === 0 && (
              <p className="text-center text-gray-500">
                No queries yet
              </p>
            )}

            {queries.map((q) => (
              <div
                key={q._id}
                className="bg-white rounded-2xl border border-green-900/20 shadow-sm p-6"
              >
                {/* QUERY HEADER */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-900">
                    {q.farmerId?.name?.charAt(0) || "F"}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-green-950">
                        {q.farmerId?.name || "Farmer"}
                      </h3>
                      <span className="text-sm text-green-700">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="mt-2 text-green-900 text-lg font-bold font-mono">
                      {q.question}
                    </h3>

                    {/* PRODUCT INFO */}
                    {q.productId && (
                      <p className="mt-2 text-xs text-gray-600">
                        Product:{" "}
                        <span className="font-semibold">
                          {q.productId.cropname}
                        </span>{" "}
                        ({q.productId.category})
                      </p>
                    )}
                  </div>
                </div>

                {/* REPLY SECTION */}
                {q.reply && (
                  <div className="mt-5 ml-16 p-4 bg-green-50 rounded-xl border border-green-900/10">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-green-900">
                        Reply from farmer
                      </span>
                      <span className="text-xs text-green-700">
                        {new Date(q.replyDate).toLocaleDateString()}
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
        </div>
      </div>
    </div>
  );
};

export default Myquery;
