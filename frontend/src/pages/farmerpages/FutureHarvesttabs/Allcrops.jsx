import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Calendar, Package, TrendingUp,} from "lucide-react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { viewallfutharvestcrops } from "../../../api/api";

/* ================= MAIN COMPONENT ================= */
const Allcrops = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await viewallfutharvestcrops();
        setData(response?.data || response || []);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };
    fetchdata();
  }, []);

  /* ---------- DATE HELPERS ---------- */
  const getRemainingDays = (expectedDate) => {
    const today = new Date();
    const harvestDate = new Date(expectedDate);

    today.setHours(0, 0, 0, 0);
    harvestDate.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
      (harvestDate - today) / (1000 * 60 * 60 * 24)
    );
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="flex flex-col gap-8">
      {data.map((item) => (
        <div
          key={item._id}
          className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden flex"
        >
          {/* LEFT IMAGE */}
          <div className="relative w-2/5">
            <img
              src={
                item.cropimage ||
                "https://images.unsplash.com/photo-1582515073490-dc84b9b1f6c2"
              }
              alt={item.cropname}
              className="w-full h-full object-cover"
            />

            <span className="absolute top-4 left-4 bg-orange-500 text-white text-sm px-4 py-1 rounded-full">
              ⚠ {item.growthStage}
            </span>

            <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-xl flex items-center gap-2 text-green-900 text-sm font-medium">
              <Calendar size={16} />
              Harvest in {getRemainingDays(item.expectedHarvestDate)} days
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="w-3/5 p-8 flex flex-col justify-between">
            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-green-950">
                  {item.cropname}
                </h2>
                <p className="text-green-700 mt-1">
                  Expected: {formatDate(item.expectedHarvestDate)}
                </p>
              </div>

              
              <div className="text-right">
                <Link to={`/farmer/futureharvestcrops/futureharvestallcropdet/${item._id}`}>
                <FaArrowAltCircleRight size={25} className="text-green-950" />
                </Link>
              </div>
            </div>
            

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Stat
                icon={<Package size={20} />}
                label="Est. Quantity"
                value={`${item.expectedQuantity} kg`}
              />

              <Stat
                icon={<Calendar size={20} />}
                label="Days Remaining"
                value={`${getRemainingDays(
                  item.expectedHarvestDate
                )} days`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ================= STAT COMPONENT ================= */
const Stat = ({ icon, label, value }) => (
  <div className="bg-amber-50 rounded-2xl p-4 flex items-center gap-3">
    <div className="p-2 bg-white rounded-xl text-amber-700">
      {icon}
    </div>
    <div>
      <p className="text-sm text-green-700">{label}</p>
      <p className="font-bold text-green-950">{value}</p>
    </div>
  </div>
);

export default Allcrops;
