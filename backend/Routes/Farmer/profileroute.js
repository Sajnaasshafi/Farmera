import express from 'express'
import { getFarmerProfile, updateFarmerProfile } from "../../Controller/Farmercontroller/profilecontroller.js";
import { getBankDetails } from "../../Controller/Farmercontroller/bankcontroller.js"
import upload from '../../config/multer.js';
const profileRouter = express.Router();

// Get farmer profile by ID
profileRouter.get("/viewprofile/:id", getFarmerProfile);

// Update farmer profile (with image upload)
profileRouter.put("/updateprofile/:id",upload.single("farmerimage"), updateFarmerProfile);

//Bank details
profileRouter.get("/viewbankdetails/:id", getBankDetails);

export default profileRouter;