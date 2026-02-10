import React, { useEffect, useState } from "react";
import { ShoppingCart, Heart, HelpCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Navbar from "../../../components/buyercomponent.jsx/Navbar";
import { getharvestedcropdetails } from "../../../api/api";
import { postQuery } from "../../../api/api";

import { addToCart } from "../../../redux/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/wishlistSlice";

const Harvested = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  /* ---------------- STATE ---------------- */
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showQueryModal, setShowQueryModal] = useState(false);
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);

  /* ---------------- REDUX ---------------- */
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
  const fetchProduct = async () => {
    try {
      console.log("🟡 fetching harvested product:", id);

      const res = await getharvestedcropdetails(id);
      const productData = res?.data || res; // ✅ single object

      console.log("🟢 product from API:", productData);

      if (!productData?._id) {
        toast.error("Product not found");
        return;
      }

      setProduct(productData);
    } catch (error) {
      console.error("🔴 fetchProduct error:", error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);

  /* ---------------- CART ---------------- */
  const handleAddToCart = () => {
  if (!product) return;

  const exists = cartItems.some((c) => c.id === product._id);
  if (exists) {
    toast.error("Already in cart");
    return;
  }

  console.log("📦 Product before dispatch:", product);

  dispatch(
  addToCart({
    id: product._id,

    farmerId: product.farmerId._id, // ✅ NOW EXISTS
    farmerName: product.farmerId.name,
    farmName: product.farmerId.farmName,
    farmLocation: product.farmerId.farmLocation,

    productType: "Harvested",
    name: product.cropname,
    variety: product.variety,
    price: product.pricePerKg,
    quantity: 1,
    image: product.cropimage,
  })
);

  toast.success("Added to cart");
};

  /* ---------------- WISHLIST ---------------- */
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
          price: product.pricePerKg,
          category: product.category,
          harvestDate: product.harvestDate
        })
      );
      toast.success("Added to wishlist");
    }
  };

  /* ---------------- QUERY SUBMIT ---------------- */
  const handleSubmitQuery = async () => {
  if (!question.trim()) {
    return toast.error("Please enter your question");
  }

  const buyerId = localStorage.getItem("id");
  if (!buyerId) {
    return toast.error("Please login first");
  }

  const payload = {
    productId: product._id,
    farmerId: product.farmerId,
    productType: "Harvested", // ✅ ENUM MATCH
    question,
  };

  try {
    setSending(true);
    await postQuery(buyerId, payload); // ✅ ONE CALL ONLY
    toast.success("Query sent to farmer");
    setQuestion("");
    setShowQueryModal(false);
  } catch (error) {
    console.error("Query error:", error.response?.data || error.message);
    toast.error(
      error.response?.data?.message || "Failed to send query"
    );
  } finally {
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
          <div className="flex flex-col gap-4">
            <div className="w-full h-[420px] bg-white rounded-2xl shadow relative">
              <img
                src={product.cropimage || "/placeholder.jpg"}
                alt={product.cropname}
                className="h-full w-full object-contain"
              />

              <div className="absolute bottom-4 right-4 flex gap-3">
                <button
                  onClick={handleAddToCart}
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
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl shadow p-8">
            <h1 className="text-3xl font-semibold mb-3">
              {product.cropname}{" "}
              <span className="text-amber-600">({product.variety})</span>
            </h1>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span>Harvest Date</span>
                <span>
                  {new Date(product.harvestDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Available Quantity</span>
                <span>{product.availableQuantity} kg</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Price</span>
                <span>₹{product.pricePerKg} / kg</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>freshnessLevel</span>
                <span>{product.freshnessLevel}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Grade</span>
                <span>{product.grade}</span>
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

export default Harvested;
