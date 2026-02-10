import express from 'express'
import {getAllFarmersWithOrderCounts, getBuyerProfile, getAllQueries, getAllOrders, getOrderCounts, getUserCounts} from '../../Controller/Admincontroller/usermanagecontroller.js';



const adminRouter = express.Router();


adminRouter.get("/getfarmers", getAllFarmersWithOrderCounts);
adminRouter.get("/getbuyers", getBuyerProfile);
adminRouter.get("/getqueries", getAllQueries);
adminRouter.get("/getorders", getAllOrders);
adminRouter.get("/getordercount", getOrderCounts);
adminRouter.get("/getusercount", getUserCounts);



export default adminRouter;