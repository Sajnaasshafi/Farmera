import express from 'express'
import {addmyfutcrop, deletemycrop, futharvestcropdetails, updatemycrop, viewallfutharvestcrops, viewmyfutcrop, } from '../../Controller/Farmercontroller/futureharvestcontroller.js';
import upload from '../../config/multer.js';


const futharvestRouter = express.Router();

futharvestRouter.post('/addmyfutcrops/:id',upload.single("cropimage"), addmyfutcrop)
futharvestRouter.get('/viewmyfutcrops/:id', viewmyfutcrop)
futharvestRouter.put("/updatemycrop/:id", upload.single("cropimage"), updatemycrop);
futharvestRouter.delete('/deletemycrop/:id', deletemycrop)
futharvestRouter.get('/viewallfutharvestcrops', viewallfutharvestcrops)
futharvestRouter.get('/viewfutcropdetails/:id', futharvestcropdetails)


export default futharvestRouter;