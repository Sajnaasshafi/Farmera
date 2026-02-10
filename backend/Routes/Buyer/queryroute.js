import express from 'express'
import { postQuery, getQueriesByBuyer, getAllQueriesForFarmer, replyToQuery } from "../../Controller/Buyercontroller/querycontroller.js";


const buyerqueryRouter = express.Router();

buyerqueryRouter.post("/queryask/:buyerId", postQuery);
buyerqueryRouter.get("/querygetbyid/:buyerId", getQueriesByBuyer);

//farmers
buyerqueryRouter.get("/farmer/:farmerId/queries", getAllQueriesForFarmer);
buyerqueryRouter.put("/reply/:queryId/reply", replyToQuery);


export default buyerqueryRouter;