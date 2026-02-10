import express from 'express'
import {addmycrop, viewmycrop, updatemycrop, deletemycrop, viewallharvestedcrops, harvestedcropdetails} from '../../Controller/Farmercontroller/harvestedcontroller.js';
import upload from '../../config/multer.js';


const harvestedRouter = express.Router();

harvestedRouter.post('/addmycrops/:id',upload.single("cropimage"), addmycrop)
harvestedRouter.get('/viewmycrops/:id', viewmycrop)
harvestedRouter.put('/updatemycrop/:id', updatemycrop)
harvestedRouter.delete('/deletemycrop/:id', deletemycrop)
harvestedRouter.get('/viewallharvestedcrops', viewallharvestedcrops)
harvestedRouter.get('/viewcropdetails/:id', harvestedcropdetails)


export default harvestedRouter;