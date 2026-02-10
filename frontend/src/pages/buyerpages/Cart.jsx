import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2, ShoppingCart, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/buyercomponent.jsx/Navbar";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔥 Get cart from Redux
  const cartItems = useSelector((state) => state.cart.items);
  console.log("🛒 Cart items from Redux:", cartItems);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full px-12 py-10">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-green-950 flex items-center gap-3 mb-8">
          <ShoppingCart className="w-7 h-7 text-green-900" />
          My Cart
          <span className="text-base text-gray-500 font-medium">
            ({cartItems.length} items)
          </span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            Your cart is empty 🛒
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT: CART ITEMS */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border rounded-xl p-6 flex justify-between items-center shadow-sm"
                >
                  {/* LEFT INFO */}
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">Image</span>
                    </div>

                    <div>
                      <h2 className="font-semibold text-lg text-green-950">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-green-900 font-medium">
                        ₹{item.price}
                        <span className="text-gray-500 text-sm">
                          /KG
                        </span>
                      </p>

                      <p className="mt-1 text-green-900 font-medium">
                        {item.variety}
                        <span className="text-gray-500 text-sm ml-3">
                          ({item.category})
                        </span>
                      </p>

                      

                    </div>
                  </div>

                  {/* RIGHT CONTROLS */}
                  <div className="flex items-center gap-10">
                    {/* QTY */}
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() => dispatch(decrementQty(item.id))}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="px-4 font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(incrementQty(item.id))}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* PRICE */}
                    <p className="font-semibold text-green-950">
                      ₹{item.price * item.quantity}
                    </p>

                    {/* REMOVE */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: SUMMARY */}
            <div className="bg-white border rounded-xl p-6 h-fit shadow-sm">
              <h2 className="text-xl font-bold text-green-950 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">₹{deliveryFee}</span>
                </div>

                <hr />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-900">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
  onClick={() => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/buyer/checkout");
  }}
  className="mt-6 w-full bg-green-900 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
>
  Proceed to Checkout
</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
