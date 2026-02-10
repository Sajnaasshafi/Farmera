import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, Calendar, Package, TrendingUp } from "lucide-react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { getmyfutharvestcrop } from "../../../api/api";

/* ================= GROWTH PROGRESS CONFIG ================= */
const getGrowthProgress = (stage) => {
  switch (stage) {
    case "Seeded":
      return { percent: 10, color: "bg-red-400" };

    case "Growing":
      return { percent: 25, color: "bg-amber-400" };

    case "Flowering":
      return { percent: 55, color: "bg-yellow-500" };

    case "ReadySoon":
      return { percent: 75, color: "bg-green-600" };

    default:
      return { percent: 0, color: "bg-gray-300" };
  }
};

const Mycrops = () => {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("id");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getmyfutharvestcrop(id);
        setData(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };

    fetchdata();
  }, [id]);

  /* ================= HELPERS ================= */
  const getRemainingDays = (expectedDate) => {
    const today = new Date();
    const harvestDate = new Date(expectedDate);

    today.setHours(0, 0, 0, 0);
    harvestDate.setHours(0, 0, 0, 0);

    const diffTime = harvestDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const getHarvestText = (dateString) => {
    const today = new Date();
    const harvestDate = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    harvestDate.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil(
      (harvestDate - today) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Harvest Today";
    if (diffDays === 1) return "Harvest Tomorrow";
    if (diffDays > 1) return `In ${diffDays} days`;
    return `Overdue by ${Math.abs(diffDays)} days`;
  };

  /* ================= UI ================= */
  return (
    <div className="flex flex-col gap-8">
      {data.map((item) => {
        const progress = getGrowthProgress(item.growthStage);

        return (
          <div
            key={item._id}
            className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden flex"
          >
            {/* LEFT IMAGE */}
            <div className="relative w-2/5">
              <img
                src={item.cropimage || "/placeholder.jpg"}
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
                    Expected: {getHarvestText(item.expectedHarvestDate)} (
                    {new Date(item.expectedHarvestDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                    )
                  </p>
                </div>

                <div className="text-right">
                  <Link to={`/farmer/futureharvestcrops/futureharvestcropsdetails/${item._id}`}>
  <button
    title="Next Action"
    className="p-4 rounded-2xl 
               bg-green-100 hover:bg-green-200 
               text-green-800 transition-all 
               flex items-center justify-center"
  >
    <FaArrowAltCircleRight size={20} />
  </button>
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
                  icon={<TrendingUp size={20} />}
                  label="Projected Revenue"
                  value={`₹${
                    Number(item.expectedQuantity) *
                    Number(item.expectedPricePerKg)
                  }`}
                />

                <Stat
                  icon={<Calendar size={20} />}
                  label="Days Remaining"
                  value={`${getRemainingDays(
                    item.expectedHarvestDate
                  )} days`}
                />
              </div>

              {/* PROGRESS */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-green-700 mb-2">
                  <span>Growth Progress</span>
                  <span className="font-semibold">
                    {progress.percent}%
                  </span>
                </div>

                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${progress.color} rounded-full transition-all duration-700`}
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
              </div>

              {/* BUTTON */}
              <div className="mt-6 flex items-center gap-4">
  
</div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ================= STAT COMPONENT ================= */
const Stat = ({ icon, label, value }) => (
  <div className="bg-amber-50 rounded-2xl p-4 flex items-center gap-3">
    <div className="p-2 bg-white rounded-xl text-amber-700">{icon}</div>
    <div>
      <p className="text-sm text-green-700">{label}</p>
      <p className="font-bold text-green-950">{value}</p>
    </div>
  </div>
);

export default Mycrops;
