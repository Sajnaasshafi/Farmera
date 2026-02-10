import React, { useEffect, useState } from "react";
import Sidebar from "../../components/farmercomponets.jsx/Sidebar";
import Orderheader from "../../components/farmercomponets.jsx/Orderheader";
import { getFarmerOrders, updateOrderStatus } from "../../api/api";
import toast from "react-hot-toast";


const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getFarmerOrders();
        setOrders(data); // backend sends array
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (error) {
  console.error(error);

  toast.error(
    error.response?.data?.message || "Failed to update order status"
  );
}
  };

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white shadow">
          <Orderheader />
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500">
              Loading orders...
            </p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-500">
              No orders found
            </p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl border shadow-sm p-6"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-green-700">
                      Order #{order._id.slice(-6)}
                    </h3>

                    <select
                      value={order.status}
                      disabled={order.status === "Delivered"}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      className={`px-4 py-1 rounded-full text-sm border font-medium
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Buyer & Payment */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <p>
                      <strong>Buyer:</strong>{" "}
                      {order.buyerId?.name} ({order.buyerId?.email})
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {order.paymentMethod}
                    </p>
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {new Date(order.createdAt).toDateString()}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹{order.totalAmount}
                    </p>
                  </div>

                  {/* Address */}
                  <div className="mt-4 text-sm text-gray-700">
                    <strong>Delivery Address</strong>
                    <p>
                      {order.deliveryAddress.street},{" "}
                      {order.deliveryAddress.city},{" "}
                      {order.deliveryAddress.state} -{" "}
                      {order.deliveryAddress.pincode}
                    </p>
                    <p>📞 {order.deliveryAddress.phone}</p>
                  </div>

                  {/* Items */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Products
                    </h4>

                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center border rounded-lg p-3"
                        >
                          <div>
                            <p className="font-medium">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity} × ₹{item.price}
                            </p>
                            <p className="text-xs text-gray-500">
                              Type: {item.productType}
                            </p>
                          </div>

                          <div className="font-semibold text-green-700">
                            ₹{item.quantity * item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
