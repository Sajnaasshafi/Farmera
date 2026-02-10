import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getmyharvestedcrop } from "../../../api/api";

const Mycrops = () => {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getmyharvestedcrop(id);
        setData(response);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };

    fetchdata();
  }, [id]);

  return (
    <div className="flex flex-wrap gap-6">
      {data.map((item) => (
        <Link
          key={item._id}
          to={`/farmer/harvestedcrops/harvestedcropsdetails/${item._id}`}
          className="w-[260px] bg-white rounded-2xl shadow-lg overflow-hidden
                     border border-green-100 cursor-pointer
                     hover:shadow-xl hover:scale-[1.02]
                     transition-all duration-200"
        >
          
          <div className="relative h-44">
            <img
              src={item.cropimage || "/placeholder.jpg"}
              alt={item.cropname}
              className="w-full h-full object-cover"
            />
          </div>

          
          <div className="p-4 space-y-3">
            <h3 className="text-lg font-bold text-green-950">
              {item.cropname}
            </h3>

            <div className="flex justify-between text-sm text-green-900">
              <span>Available:</span>
              <span>{item.availableQuantity} kg</span>
            </div>

            <div className="flex justify-between text-sm text-green-900">
              <span>Price:</span>
              <span>₹{item.pricePerKg}/kg</span>
            </div>
          </div>
        </Link>
      ))}

      {data.length === 0 && (
        <p className="text-green-900 font-medium">
          No crops added yet 🌾
        </p>
      )}
    </div>
  );
};

export default Mycrops;
