import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { addToCart } from "../../../redux/cartSlice";
import { viewallharvestedcrops } from "../../../api/api";

const Harvestedcrops = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  /* ---------- FETCH DATA ---------- */
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await viewallharvestedcrops();
        setData(response?.data || response || []);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };

    fetchdata();
  }, []);

  /* ---------- DATE FORMAT ---------- */
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  /* ---------- STOCK STATUS ---------- */
  const getStockStatus = (qty) => {
    if (qty > 10)
      return { label: "In Stock", className: "bg-green-100 text-green-800" };
    if (qty > 1)
      return {
        label: "Limited Stock",
        className: "bg-yellow-100 text-yellow-800",
      };
    return { label: "Out of Stock", className: "bg-red-100 text-red-800" };
  };

  /* ---------- ADD TO CART ---------- */
  const handleAddToCart = (e, item) => {
    e.stopPropagation(); // 🔥 PREVENT CARD CLICK

    const alreadyInCart = cartItems.some(
      (cartItem) => cartItem.id === item._id
    );

    if (alreadyInCart) {
      toast.error("Item already added to cart");
      return;
    }

    dispatch(
  addToCart({
    id: item._id,

    // 🔥 REQUIRED FIELDS FOR ORDER
    farmerId: item.farmerId?._id,          // ✅ FIX
    farmerName: item.farmerId?.name,       // optional
    farmName: item.farmerId?.farmName,     // optional
    farmLocation: item.farmerId?.farmLocation, // optional

    productType: "Harvested",

    name: item.cropname,
    variety: item.variety,
    price: item.pricePerKg,
    quantity: 1,

    harvestDate: item.harvestDate,
    grade: item.grade,
    image: item.cropimage,
  })
);

    toast.success("Added to cart");
  };

  return (
    <div className="mt-10 w-full">
      <h2 className="text-2xl font-bold text-green-950 mb-6">
        Available Harvested Crops
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => {
          const stock = getStockStatus(item.availableQuantity);

          return (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/buyer/harvestedproductdetails/${item._id}`)
              }
              className="cursor-pointer border border-green-900/10 rounded-xl bg-white overflow-hidden hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <div className="h-48 bg-green-50">
                <img
                  className="h-full w-full object-cover"
                  src={item.cropimage || "/placeholder.jpg"}
                  alt={item.cropname}
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <p
                  className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold ${stock.className}`}
                >
                  {stock.label}
                </p>

                <h3 className="text-lg font-semibold text-green-950">
                  {item.cropname}
                  <span className="text-amber-600 text-lg">
                    {" "}
                    ({item.variety})
                  </span>
                </h3>

                <p className="text-sm text-green-700">{item.category}</p>

                <p className="text-sm text-green-800 font-medium">
                  Grade: {item.grade} • {item.freshnessLevel}
                </p>

                <p className="text-sm text-green-800 font-medium">
                  Harvested on: {formatDate(item.harvestDate)}
                </p>

                {/* PRICE + BUTTON */}
                <div className="flex justify-between items-center pt-3">
                  <span className="font-bold text-green-900">
                    ₹{item.pricePerKg}/KG
                  </span>

                  <button
                    disabled={item.availableQuantity <= 1}
                    onClick={(e) => handleAddToCart(e, item)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition
                      ${
                        item.availableQuantity <= 1
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-green-900 hover:bg-green-800 text-white"
                      }`}
                  >
                    <ShoppingCart size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Harvestedcrops;
