// ================== IMPORTANT: MUST BE FIRST ==================
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import dns from "dns";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env explicitly (Windows-safe)
dotenv.config({ path: path.join(__dirname, ".env") });

// Fix MongoDB Atlas SRV DNS issue on Windows
dns.setServers(["1.1.1.1"]);

// ================== IMPORTS ==================
import express from "express";
import cors from "cors";
import { connectDB } from "./utils/db.js";

import userRouter from "./Routes/userroute.js";

// Farmer routes
import harvestedRouter from "./Routes/Farmer/harvestedroute.js";
import futharvestRouter from "./Routes/Farmer/futureharvestroute.js";
import profileRouter from "./Routes/Farmer/profileroute.js";
import bankRouter from "./Routes/Farmer/bankroute.js";

// Buyer routes
import buyerprofileRouter from "./Routes/Buyer/profileroute.js";
import buyerqueryRouter from "./Routes/Buyer/queryroute.js";
import orderRouter from "./Routes/Buyer/orderroute.js";

// Admin routes
import adminRouter from "./Routes/Admin/manageroute.js";
// ============================================

// ================== APP SETUP ==================
const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// =============================================

// ================== ROUTES ==================
app.use("/user", userRouter);

// Farmer
app.use("/farmer/harvested", harvestedRouter);
app.use("/farmer/futureharvest", futharvestRouter);
app.use("/farmer/profile", profileRouter);
app.use("/farmer/bank", bankRouter);

// Buyer
app.use("/buyer/profile", buyerprofileRouter);
app.use("/buyer/query", buyerqueryRouter);
app.use("/buyer/order", orderRouter);

// Admin
app.use("/admin/manage", adminRouter);
// ===========================================

// ================== START SERVER ==================
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
  });
// ===============================================

// ================== GLOBAL ERROR HANDLER ==================
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR 🔥");
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
// =========================================================
