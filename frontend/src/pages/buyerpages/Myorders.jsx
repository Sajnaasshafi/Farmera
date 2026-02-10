import React, { useEffect, useState } from "react";
import { CheckCircle, Truck, Clock } from "lucide-react";
import Navbar from "../../components/buyercomponent.jsx/Navbar";
import { getBuyerOrders } from "../../api/api";
import toast from "react-hot-toast";

const statusStyles = {
  Delivered: {
    icon: <CheckCircle size={14} />,
    class: "bg-green-100 text-green-800",
  },
  Confirmed: {
    icon: <Truck size={14} />,
    class: "bg-blue-100 text-blue-800",
  },
  Pending: {
    icon: <Clock size={14} />,
    class: "bg-yellow-100 text-yellow-800",
  },
  Cancelled: {
    icon: <Clock size={14} />,
    class: "bg-red-100 text-red-800",
  },
};

const Myorders = () => {
  const buyerId = localStorage.getItem("id");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ORDERS ---------------- */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getBuyerOrders(buyerId);
        setOrders(res.orders || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [buyerId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full px-12 py-10">
        <h1 className="text-3xl font-bold text-green-950 mb-8">
          My Orders
        </h1>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading your orders...
          </p>
        )}

        {/* NO ORDERS */}
        {!loading && orders.length === 0 && (
          <p className="text-center text-gray-500">
            You have not placed any orders yet.
          </p>
        )}

        {/* ORDERS */}
        <div className="space-y-6">
          {orders.map((order) => {
            const farmName =
              order.items?.[0]?.farmerId?.farmName || "Unknown Farm";

            return (
              <div
                key={order._id}
                className="border rounded-xl bg-white p-6 shadow-sm"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <h2 className="font-semibold text-green-950">
                      #{order._id.slice(-6).toUpperCase()}
                    </h2>

                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        statusStyles[order.status]?.class
                      }`}
                    >
                      {statusStyles[order.status]?.icon}
                      {order.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* FARM */}
                <p className="mt-2 text-sm text-gray-600">
                  From:{" "}
                  <span className="font-medium">
                    {farmName}
                  </span>
                </p>

                {/* ITEMS */}
                <div className="mt-4 space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <p>
                        {item.name} × {item.quantity}
                      </p>
                      <p>₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                {/* TOTAL */}
                <div className="flex justify-end">
                  <p className="font-semibold text-green-900 text-lg">
                    Total: ₹{order.totalAmount}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Myorders;
