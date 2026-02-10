import express from "express";
import { createOrder, getBuyerOrders, getFarmerOrderCounts, getOrdersByFarmer, updateOrderStatusByFarmer  } from "../../Controller/Buyercontroller/ordercontroller.js";


const orderRouter = express.Router();

/* BUYER */
orderRouter.post("/postorder/:buyerId", createOrder);
orderRouter.get("/myorders/:buyerId", getBuyerOrders);



/* FARMER */
orderRouter.patch("/farmer/:orderId/status",updateOrderStatusByFarmer);
orderRouter.get("/farmerorder/:farmerId", getOrdersByFarmer);
orderRouter.get("/farmer/ordercount/:farmerId",getFarmerOrderCounts);


export default orderRouter;
