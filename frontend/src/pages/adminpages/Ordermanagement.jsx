import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admincomponent.jsx/Sidebar";
import Ordermanagementheader from "../../components/admincomponent.jsx/Ordermanagementheader";
import { getAllOrders } from "../../api/api";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-900",
  Confirmed: "bg-blue-100 text-blue-900",
  Delivered: "bg-green-100 text-green-900",
  Cancelled: "bg-red-100 text-red-900",
};

const Ordermanagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🔥 FLATTEN: one row per item
  const orderRows = orders.flatMap((order) =>
    order.items.map((item, index) => ({
      rowId: `${order._id}-${index}`,
      orderId: order._id,
      buyer: order.buyerId?.name,
      farmer: item.farmerId?.name,
      crop: item.name,
      type: item.productType,
      quantity: item.quantity,
      status: order.status,
      total: order.totalAmount,
    }))
  );

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white">
          <Ordermanagementheader />
        </div>

        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-xl border border-green-900/20">

            {/* HEADER */}
            <div className="p-6 border-b border-green-900/20">
              <h2 className="text-2xl font-bold text-green-900">
                Orders
              </h2>
              <p className="text-sm text-green-800 mt-1">
                View all buyer orders (item-wise)
              </p>
            </div>

            {/* TABLE */}
            {loading ? (
              <p className="text-center py-10 text-gray-500">
                Loading orders...
              </p>
            ) : orderRows.length === 0 ? (
              <p className="text-center py-10 text-gray-500">
                No orders found
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-green-900/10 text-green-950">
                    <tr>
                      <th className="px-6 py-4 text-left">Order ID</th>
                      <th className="px-6 py-4 text-left">Farmer</th>
                      <th className="px-6 py-4 text-left">Buyer</th>
                      <th className="px-6 py-4 text-left">Product</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-green-900/10">
                    {orderRows.map((row) => (
                      <tr
                        key={row.rowId}
                        className="hover:bg-green-100/40 transition"
                      >
                        <td className="px-6 py-4 font-semibold">
                          #{row.orderId.slice(-6)}
                        </td>

                        <td className="px-6 py-4">
                          {row.farmer}
                        </td>

                        <td className="px-6 py-4">
                          {row.buyer}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-green-900">
                            {row.crop}
                          </div>
                          <div className="text-xs text-green-800">
                            {row.type} • {row.quantity} kg
                          </div>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[row.status]}`}
                          >
                            {row.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right font-bold">
                          ₹{row.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Ordermanagement;
