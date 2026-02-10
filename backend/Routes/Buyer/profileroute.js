import express from 'express'
import {getBuyerProfile, updateBuyerProfile, addAddress, deleteAddress, getAddresses, editAddress} from '../../Controller/Buyercontroller/profilecontroller.js';


const buyerprofileRouter = express.Router();

buyerprofileRouter.get("/getprofile/:id", getBuyerProfile);
buyerprofileRouter.put("/updateprofile/:id", updateBuyerProfile);

buyerprofileRouter.post("/addaddress/:id", addAddress);
buyerprofileRouter.delete("/deleteaddress/:id/:addressId",deleteAddress);
buyerprofileRouter.get("/getaddresses/:id", getAddresses);
buyerprofileRouter.put("/editaddress/:id/:addressId", editAddress);
export default buyerprofileRouter;