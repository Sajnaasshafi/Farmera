import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "productType", // dynamic reference
    },

    productType: {
      type: String,
      required: true,
      enum: ["Harvested", "FutureHarvest"],
    },

    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    reply: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["asked", "replied"],
      default: "asked",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Query", querySchema);
