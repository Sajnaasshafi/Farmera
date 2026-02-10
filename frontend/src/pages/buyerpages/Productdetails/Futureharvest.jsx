import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart, HelpCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Navbar from "../../../components/buyercomponent.jsx/Navbar";
import { getfutharvestcropdetails, postQuery } from "../../../api/api";

import { addToCart } from "../../../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/wishlistSlice";

const FutureHarvest = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showQueryModal, setShowQueryModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  /* ---------- FETCH FUTURE HARVEST PRODUCT ---------- */
  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const res = await getfutharvestcropdetails(id); // ✅ PASS ID
      setProduct(res); // ✅ SINGLE OBJECT
    } catch (error) {
      console.error(error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  /* ---------- PRE BOOK ---------- */
  const handlePreBook = () => {
  if (!product) return;

  const exists = cartItems.some((c) => c.id === product._id);
  if (exists) return toast.error("Already in cart");

  dispatch(
  addToCart({
    id: product._id,

    farmerId: product.farmerId._id, // ✅ populated
    farmerName: product.farmerId.name,
    farmName: product.farmerId.farmName,
    farmLocation: product.farmerId.farmLocation,

    productType: "FutureHarvest",

    name: product.cropname,
    variety: product.variety,
    price: product.pricePerKg,
    quantity: 1,

    expectedDate: product.harvestDate, // 👈 important
    image: product.cropimage,
  })
);
  toast.success("Pre-booked successfully");
};
  /* ---------- WISHLIST ---------- */
  const handleWishlist = () => {
    if (!product) return;

    const exists = wishlistItems.some((w) => w.id === product._id);

    if (exists) {
      dispatch(removeFromWishlist(product._id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(
        addToWishlist({
          id: product._id,
          name: product.cropname,
          variety: product.variety,
          price: product.expectedPricePerKg,
        })
      );
      toast.success("Added to wishlist");
    }
  };

  /* ---------- QUERY ---------- */
  const handleSubmitQuery = async () => {
    if (!question.trim()) return toast.error("Enter your question");

    const buyerId = localStorage.getItem("id");
    if (!buyerId) return toast.error("Please login first");

    try {
      setSending(true);

      await postQuery(buyerId, {
        productId: product._id,
        farmerId: product.farmerId,
        productType: "FutureHarvest",
        question,
      });

      toast.success("Query sent to farmer");
      setQuestion("");
      setShowQueryModal(false);
    } catch (error) {
  console.error(error);
  toast.error("Failed to send query");
}
finally {
      setSending(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!product) return <p className="text-center mt-20">No product found</p>;

  const isWishlisted = wishlistItems.some(
    (w) => w.id === product._id
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT */}
          <div className="w-full h-[420px] bg-white rounded-2xl shadow relative">
            <img
              src={product.cropimage || "/placeholder.jpg"}
              alt={product.cropname}
              className="h-full w-full object-contain"
            />

            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                onClick={handlePreBook}
                className="p-2 rounded-full bg-green-600 text-white"
              >
                <ShoppingCart size={16} />
              </button>

              <button
                onClick={handleWishlist}
                className={`p-2 rounded-full text-white ${
                  isWishlisted ? "bg-red-600" : "bg-red-500"
                }`}
              >
                <Heart size={16} />
              </button>

              <button
                onClick={() => setShowQueryModal(true)}
                className="p-2 rounded-full bg-blue-500 text-white"
              >
                <HelpCircle size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h1 className="text-3xl font-semibold mb-3">
              {product.cropname}{" "}
              <span className="text-amber-600">
                ({product.variety})
              </span>
            </h1>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Expected Harvest Date</span>
                <span>
                  {new Date(
                    product.expectedHarvestDate
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Expected Quantity</span>
                <span>{product.expectedQuantity} kg</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Expected Price</span>
                <span>
                  ₹{product.expectedPricePerKg} / kg
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Growing Stage</span>
                <span>{product.growthStage}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Delivery Available</span>
                <span>{product.deliveryAvailable}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Pickup Available</span>
                <span>{product.pickupAvailable}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Packaging Type</span>
                <span>{product.packagingType}</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* QUERY MODAL */}
       {showQueryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowQueryModal(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-3">
              Ask Farmer a Question
            </h2>

            <textarea
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="Type your question..."
            />

            <button
              onClick={handleSubmitQuery}
              disabled={sending}
              className="w-full mt-4 bg-green-700 text-white py-2 rounded-lg"
            >
              {sending ? "Sending..." : "Send Query"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureHarvest;
