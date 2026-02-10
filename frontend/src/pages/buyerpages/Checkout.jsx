import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../../components/buyercomponent.jsx/Navbar";
import { getAddresses, placeOrder } from "../../api/api";
import { clearCart } from "../../redux/cartSlice";

const Checkout = () => {
  const userId = localStorage.getItem("id");
  const dispatch = useDispatch()

  /* ---------------- CART ---------------- */
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  /* ---------------- ADDRESSES ---------------- */
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- PAYMENT ---------------- */
  const [paymentMethod, setPaymentMethod] = useState("COD");

  /* ---------------- LOAD ADDRESSES ---------------- */
  useEffect(() => {
    if (!userId) return;

    const loadAddresses = async () => {
      try {
        const res = await getAddresses(userId);
        const data = res?.data?.addresses || [];

        setAddresses(data);

        const defaultAddr = data.find((a) => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
        }
      } catch (err) {
        console.error("Address fetch error:", err);
        toast.error("Failed to load addresses");
      } finally {
        setLoading(false);
      }
    };

    loadAddresses();
  }, [userId]);

  /* ---------------- PLACE ORDER ---------------- */
  const handlePlaceOrder = async () => {
  if (!selectedAddressId) {
    toast.error("Please select a delivery address");
    return;
  }

  if (!paymentMethod) {
    toast.error("Please select a payment method");
    return;
  }

  /* 🔥 VALIDATE CART ITEMS */
  for (const item of cartItems) {
    if (!item.farmerId) {
      toast.error(`Missing farmer for product: ${item.name}`);
      return;
    }

    if (!item.productType) {
      toast.error(`Missing product type for: ${item.name}`);
      return;
    }
  }

  /* 🔥 NORMALIZE ITEMS */
  const orderItems = cartItems.map((item) => ({
    productId: item.id,
    farmerId: item.farmerId,
    productType: item.productType, // Harvested | FutureHarvest

    name: item.name,
    variety: item.variety,
    category: item.category || "",
    image: item.image || "",

    price: item.price,
    quantity: item.quantity,

    expectedDate: item.harvestDate || null,
  }));

  const payload = {
    addressId: selectedAddressId,
    items: orderItems,
    subtotal,
    deliveryFee,
    totalAmount: total,

    // ✅ FIX ENUM CASE
    paymentMethod: paymentMethod === "CARD" ? "Card" : paymentMethod,
  };

  try {
    const res = await placeOrder(userId, payload);
    toast.success("✅ Order placed successfully!");
    dispatch(clearCart());
    console.log("📦 ORDER RESPONSE:", res);
  } catch (err) {
    console.error("ORDER ERROR:", err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Failed to place order");
  }
};


  if (loading) {
    return <p className="mt-20 text-center">Loading checkout...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* DELIVERY ADDRESS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-green-950 mb-4 flex items-center gap-2">
              <MapPin />
              Delivery Address
            </h2>

            {addresses.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No address found. Please add one.
              </p>
            ) : (
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <label
                    key={addr._id}
                    className={`block border rounded-xl p-4 cursor-pointer
                      ${
                        selectedAddressId === addr._id
                          ? "border-green-600 bg-green-50"
                          : "hover:border-gray-400"
                      }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="mr-3"
                      checked={selectedAddressId === addr._id}
                      onChange={() => setSelectedAddressId(addr._id)}
                    />

                    <span className="font-semibold">{addr.label}</span>

                    {addr.isDefault && (
                      <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}

                    <p className="text-sm text-gray-600 mt-1">
                      {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                      <br />
                      Phone: {addr.phone}
                    </p>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* ORDER ITEMS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-green-950 mb-4">
              Order Items
            </h2>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-green-950 mb-4">
              Payment Method
            </h2>

            <div className="space-y-4">
              {["COD", "UPI", "CARD"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer
                    ${
                      paymentMethod === method
                        ? "border-green-600 bg-green-50"
                        : "hover:border-gray-400"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />

                  <div>
                    <p className="font-semibold">
                      {method === "COD"
                        ? "Cash on Delivery"
                        : method === "UPI"
                        ? "UPI"
                        : "Credit / Debit Card"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {method === "COD"
                        ? "Pay when order arrives"
                        : method === "UPI"
                        ? "GPay, PhonePe, Paytm"
                        : "Visa, MasterCard, RuPay"}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-bold text-green-950 mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryFee}</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-green-900">₹{total}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-900 hover:bg-green-800 text-white py-3 rounded-lg font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
