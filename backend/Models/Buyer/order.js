import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    deliveryAddress: {
      label: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },

        productType: {
          type: String,
          enum: ["Harvested", "FutureHarvest"],
          required: true,
        },

        farmerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        name: String,
        variety: String,
        category: String,
        image: String,

        price: Number,
        quantity: Number,

        expectedDate: Date, // Future harvest
      },
    ],

    subtotal: Number,
    deliveryFee: Number,
    totalAmount: Number,

    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "Card"],
      default: "COD",
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
      default: "Pending",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
