import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("👉 ACTUAL DB URI:", process.env.MONGO_URI);

    await mongoose.connect("mongodb+srv://sajnaasshafi:sajna123@cluster0.p8foq.mongodb.net/farmera?appName=Cluster0&retryWrites=true&w=majority");

    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
}
