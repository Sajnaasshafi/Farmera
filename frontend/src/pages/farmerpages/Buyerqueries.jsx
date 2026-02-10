import React, { useEffect, useState } from "react";
import { MessageCircle, User } from "lucide-react";
import { FaQuestion } from "react-icons/fa";
import Sidebar from "../../components/farmercomponets.jsx/Sidebar";
import StatCard from "../../components/farmercomponets.jsx/StatCard";
import QueryCard from "../../components/farmercomponets.jsx/QueryCard";
import Buyerqueriesheader from "../../components/farmercomponets.jsx/Buyerqueries";
import { getFarmerQueries, replyToFarmerQuery } from "../../api/api";
import { toast } from "react-toastify";

const Buyerqueries = () => {
  const farmerId = localStorage.getItem("id");
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyModal, setReplyModal] = useState({ open: false, queryId: null });
  const [replyText, setReplyText] = useState("");

  // ---------------- Fetch Queries ----------------
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true);
        const { queries: apiQueries } = await getFarmerQueries(farmerId);

        const mappedQueries = apiQueries.map((q) => ({
          _id: q._id,
          buyerName: q.buyerId?.name || "Unknown Buyer",
          crop: q.productId?.cropname || "Unknown Crop",
          variety: q.productId?.variety || "",
          category: q.productId?.category || "",
          productType: q.productType || "",
          timeAgo: new Date(q.createdAt).toLocaleString(),
          message: q.question,
          status: q.status === "asked" ? "New" : q.status,
          reply: q.reply || "",
          initials: q.buyerId?.name
            .split(" ")
            .map((n) => n[0])
            .join(""),
        }));

        setQueries(mappedQueries);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load queries");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, [farmerId]);

  // ---------------- Handle Reply ----------------
  const handleReply = async () => {
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    try {
      await replyToFarmerQuery(replyModal.queryId, replyText);

      setQueries((prev) =>
        prev.map((q) =>
          q._id === replyModal.queryId
            ? { ...q, status: "Replied", reply: replyText }
            : q
        )
      );

      toast.success("Reply sent!");
      setReplyText("");
      setReplyModal({ open: false, queryId: null });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reply");
    }
  };

  if (loading) return <p className="mt-20 text-center">Loading queries...</p>;

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* HEADER */}
        <div className="sticky top-0 z-50 bg-white">
          <Buyerqueriesheader />
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <div className="bg-white rounded-lg p-6 shadow-sm min-h-[300px]">
            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <StatCard
                icon={<MessageCircle size={20} />}
                label="New Queries"
                value={queries.filter((q) => q.status === "New").length}
                badge
              />
              <StatCard
                icon={<FaQuestion size={20} />}
                label="Total Queries"
                value={queries.length}
                brown
              />
              <StatCard
                icon={<User size={20} />}
                label="Total Buyers"
                value={new Set(queries.map((q) => q.buyerName)).size}
              />
            </div>

            {/* QUERIES */}
            <div className="space-y-6">
              {queries.map((query) => (
                <QueryCard
                  key={query._id}
                  initials={query.initials}
                  name={query.buyerName}
                  crop={`${query.crop} (${query.productType})`}
                  time={query.timeAgo}
                  message={query.message}
                  status={query.status}
                  reply={query.reply}
                  onReplyClick={() => {
                    setReplyText(query.reply || "");
                    setReplyModal({ open: true, queryId: query._id });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- REPLY MODAL ---------------- */}
      {replyModal.open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
          onClick={() => setReplyModal({ open: false, queryId: null })}
        >
          <div
            className="bg-white rounded-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()} // prevent modal closing when clicking inside
          >
            <h2 className="text-lg font-semibold mb-4">Reply to Buyer</h2>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
            />
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setReplyModal({ open: false, queryId: null })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-900 text-white hover:bg-green-800"
                onClick={handleReply}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buyerqueries;
