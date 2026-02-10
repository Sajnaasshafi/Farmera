import express from "express";
import {
  getBankDetails,
  addBankDetails,
  updateBankDetails,
  deleteBankDetails,
} from "../../Controller/Farmercontroller/bankcontroller.js";

const bankRouter = express.Router();

// ✅ Get bank details of a particular farmer
bankRouter.get("/getbank/:id", getBankDetails);

// ✅ Add bank details for a particular farmer
bankRouter.post("/addbank/:id", addBankDetails);

// ✅ Update bank details for a particular farmer
bankRouter.put("/editbank/:id", updateBankDetails);

// ✅ Delete bank details for a particular farmer
bankRouter.delete("/deletebank/:id", deleteBankDetails);

export default bankRouter;
