import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { addToCart } from "../../../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/wishlistSlice";

import { viewallfutharvestcrops } from "../../../api/api";
import { useNavigate } from "react-router-dom";

const Futureharvest = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  /* ---------- REDUX STATE ---------- */
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  /* ---------- FETCH DATA ---------- */
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

  /* ---------- STOCK STATUS ---------- */
  const getStockStatus = (qty) => {
    if (qty > 10) {
      return { label: "In Stock", className: "bg-green-100 text-green-800" };
    }
    if (qty > 1) {
      return {
        label: "Limited Stock",
        className: "bg-yellow-100 text-yellow-800",
      };
    }
    return { label: "Out of Stock", className: "bg-red-100 text-red-800" };
  };

  /* ---------- DATE FORMAT ---------- */
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  /* ---------- CART HANDLER ---------- */
  const handlePreBook = (item) => {
    const alreadyInCart = cartItems.find(
      (cartItem) => cartItem.id === item._id
    );

    if (alreadyInCart) {
      toast.error("Item already added to cart");
      return;
    }

    dispatch(
  addToCart({
    id: item._id,

    // 🔥 REQUIRED FOR ORDER (DO NOT SKIP)
    farmerId: item.farmerId?._id,          // ✅ populated farmer
    farmerName: item.farmerId?.name,       // optional
    farmName: item.farmerId?.farmName,     // optional
    farmLocation: item.farmerId?.farmLocation, // optional

    productType: "FutureHarvest",

    name: item.cropname,
    variety: item.variety,
    price: item.expectedPricePerKg,

    quantity: 1, 
    expectedDate: item.expectedHarvestDate,
    image: item.cropimage,
  })
);


    toast.success("Pre-booked successfully");
  };

  /* ---------- WISHLIST HANDLER ---------- */
  const handleWishlist = (item) => {
    const exists = wishlistItems.find(
      (wishItem) => wishItem.id === item._id
    );

    if (exists) {
      dispatch(removeFromWishlist(item._id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(
        addToWishlist({
          id: item._id,
          name: item.cropname,
          variety: item.variety,
          price: item.expectedPricePerKg,
        })
      );
      toast.success("Added to wishlist");
    }
  };

  return (
    <section className="w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-950">
          Pre-book Future Harvest
        </h2>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item) => {
          const stock = getStockStatus(item.expectedQuantity);
          const isWishlisted = wishlistItems.some(
            (wish) => wish.id === item._id
          );

          return (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/buyer/futureharvestproductdetails/${item._id}`)
              }
              className="border rounded-xl overflow-hidden bg-white hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <div className="h-44 bg-green-50 flex items-center justify-center">
                <img
                  className="h-44 w-full object-cover"
                  src={item.cropimage || "/placeholder.jpg"}
                  alt={item.cropname}
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col gap-3">
                {/* STOCK BADGE */}
                <p
                  className={`inline-block w-fit px-3 py-1 rounded-full text-xs font-semibold ${stock.className}`}
                >
                  {stock.label}
                </p>

                {/* NAME */}
                <h3 className="text-lg font-semibold text-green-950">
                  {item.cropname}
                  <span className="text-amber-600">
                    {" "}
                    ({item.variety})
                  </span>
                </h3>

                <p className="text-gray-600 text-sm">{item.category}</p>

                <p className="text-sm text-green-800 font-medium">
                  Expected on: {formatDate(item.expectedHarvestDate)}
                </p>

                {/* PRICE + ACTION */}
                <div className="flex justify-between items-center mt-4">
                  <p className="text-green-900 font-bold text-lg">
                    ₹{item.expectedPricePerKg}/KG
                  </p>

                  <div className="flex items-center gap-3">
                    {/* HEART ICON */}
                    <button
                      onClick={() => handleWishlist(item)}
                      className="p-2 rounded-full hover:bg-red-100 transition"
                    >
                      <Heart
                        size={18}
                        className={
                          isWishlisted
                            ? "fill-green-900 text-green-700"
                            : "text-gray-500"
                        }
                      />
                    </button>

                    {/* CART BUTTON */}
                    <button
                      disabled={item.expectedQuantity <= 1}
                      onClick={() => handlePreBook(item)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition
                        ${
                          item.expectedQuantity <= 1
                            ? "bg-gray-300 cursor-not-allowed text-gray-600"
                            : "bg-green-900 hover:bg-green-800 text-white"
                        }`}
                    >
                      <ShoppingCart size={16} />
                      Pre-book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Futureharvest;
