import Order from "../../Models/Buyer/order.js";
import User from "../../Models/user.js";

export const createOrder = async (req, res) => {
  try {
    const { buyerId } = req.params;

    const {
      addressId,
      items,
      subtotal,
      deliveryFee,
      totalAmount,
      paymentMethod,
    } = req.body;

    /* ---------------- VALIDATIONS ---------------- */
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    if (!addressId) {
      return res.status(400).json({ message: "Address is required" });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    /* ---------------- FETCH BUYER ---------------- */
    const buyer = await User.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    /* ---------------- FIND ADDRESS ---------------- */
    const address = buyer.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    /* ---------------- CREATE ORDER ---------------- */
    const order = new Order({
      buyerId,

      deliveryAddress: {
        label: address.label,
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        phone: address.phone,
      },

      items,
      subtotal,
      deliveryFee,
      totalAmount,

      paymentMethod, // COD | UPI | CARD
      status: "Pending",
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get myordes

export const getBuyerOrders = async (req, res) => {
  try {
    const { buyerId } = req.params;

    const orders = await Order.find({ buyerId })
      .populate("items.farmerId", "name farmName farmLocation email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get Buyer Orders Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get order(hisown) by a farmer

export const getOrdersByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;

    if (!farmerId) {
      return res.status(400).json({ message: "Farmer ID required" });
    }

    // Find orders where items contain this farmerId
    const orders = await Order.find({
      "items.farmerId": farmerId,
    })
      .populate("buyerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//chaging order status

export const updateOrderStatusByFarmer = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatus = ["Confirmed", "Delivered", "Cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔐 Farmer validation (important)
    const farmerId = req.body.farmerId;

    const belongsToFarmer = order.items.some(
      (item) => item.farmerId.toString() === farmerId
    );

    if (!belongsToFarmer) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Update ONLY status
    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated",
      status: order.status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get order count of harvest, future and total

export const getFarmerOrderCounts = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const orders = await Order.find({
      "items.farmerId": farmerId,
    });

    let futureHarvestOrders = 0;
    let harvestedOrders = 0;

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.farmerId.toString() === farmerId) {
          if (item.productType === "FutureHarvest") {
            futureHarvestOrders++;
          }
          if (item.productType === "Harvested") {
            harvestedOrders++;
          }
        }
      });
    });

    res.status(200).json({
      futureHarvestOrders,
      harvestedOrders,
      totalOrders: futureHarvestOrders + harvestedOrders,
    });
  } catch (error) {
    console.error("Get Farmer Order Counts Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

