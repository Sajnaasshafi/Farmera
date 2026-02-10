import User from "../../Models/user.js";
import Order from "../../Models/Buyer/order.js";
import Query from "../../Models/Buyer/query.js";

export const getAllFarmersWithOrderCounts = async (req, res) => {
  try {
    const farmers = await User.aggregate([
      // 1️⃣ Only farmers
      {
        $match: { userrole: "farmer" }
      },

      // 2️⃣ Join orders where farmer appears in items
      {
        $lookup: {
          from: "orders",
          let: { farmerId: "$_id" },
          pipeline: [
            { $unwind: "$items" },
            {
              $match: {
                $expr: { $eq: ["$items.farmerId", "$$farmerId"] }
              }
            }
          ],
          as: "orders"
        }
      },

      // 3️⃣ Add counts
      {
        $addFields: {
          totalOrders: { $size: "$orders" },
          harvestedOrders: {
            $size: {
              $filter: {
                input: "$orders",
                as: "order",
                cond: { $eq: ["$$order.items.productType", "Harvested"] }
              }
            }
          },
          futureHarvestOrders: {
            $size: {
              $filter: {
                input: "$orders",
                as: "order",
                cond: { $eq: ["$$order.items.productType", "FutureHarvest"] }
              }
            }
          }
        }
      },

      
      {
        $project: {
          name: 1,
          email: 1,
          phonenumber:1,
          farmname: 1,
          farmlocation: 1,
          farmerimage: 1,
          totalOrders: 1,
          harvestedOrders: 1,
          futureHarvestOrders: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      farmers
    });
  } catch (error) {
    console.error("Admin Farmer Order Summary Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch farmers",
    });
  }
};

//buyer manage

export const getBuyerProfile = async (req, res) => {
  try {
    const buyers = await User.aggregate([
      // 1️⃣ Only buyers
      {
        $match: { userrole: "buyer" }
      },

      // 2️⃣ Lookup orders for each buyer
      {
        $lookup: {
          from: "orders",
          let: { buyerId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$buyerId", "$$buyerId"] } } }
          ],
          as: "orders"
        }
      },

      // 3️⃣ Count total orders
      {
        $addFields: {
          totalOrders: { $size: "$orders" }
        }
      },

      // 4️⃣ Project only necessary fields
      {
        $project: {
          name: 1,
          email: 1,
          phonenumber: 1,
          address: 1,
          district: 1,
          state: 1,
          totalOrders: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      buyers
    });
  } catch (error) {
    console.error("Admin Buyer Order Summary Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch buyers",
      error: error.message
    });
  }
};

//query manage

export const getAllQueries = async (req, res) => {
  try {
    const queries = await Query.find()
      .populate("buyerId", "name email")
      .populate("farmerId", "name farmname email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalQueries: queries.length,
      queries,
    });
  } catch (error) {
    console.error("Admin get all queries error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch queries",
    });
  }
};

//oder manage

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyerId", "name email phonenumber")
      .populate("items.farmerId", "name farmname email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all harvest and future harvest count

export const getOrderCounts = async (req, res) => {
  try {
    const counts = await Order.aggregate([
      { $unwind: "$items" }, // break items array
      {
        $group: {
          _id: "$items.productType",
          count: { $sum: 1 },
        },
      },
    ]);

    let harvestedOrders = 0;
    let futureHarvestOrders = 0;

    counts.forEach((c) => {
      if (c._id === "Harvested") harvestedOrders = c.count;
      if (c._id === "FutureHarvest") futureHarvestOrders = c.count;
    });

    res.status(200).json({
      harvestedOrders,
      futureHarvestOrders,
      totalOrders: harvestedOrders + futureHarvestOrders,
    });
  } catch (error) {
    console.error("Get All Order Counts Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//farmer v/s buyer

export const getUserCounts = async (req, res) => {
  try {
    const farmers = await User.countDocuments({ userrole: "farmer" });
    const buyers = await User.countDocuments({ userrole: "buyer" });

    res.status(200).json({
      farmers,
      buyers,
      totalUsers: farmers + buyers,
    });
  } catch (error) {
    console.error("Get User Counts Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};