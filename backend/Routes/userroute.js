import express from 'express'
import {login, register} from '../Controller/usercontroller.js';
import upload from '../config/multer.js';

const userRouter = express.Router();

userRouter.post('/login', login)
userRouter.post(
  "/register",
  upload.single("farmerimage"),
  register
);



export default userRouter;