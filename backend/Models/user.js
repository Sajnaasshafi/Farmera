import mongoose from "mongoose";


//for buyer add..

const addressSchema = new mongoose.Schema(
  {
    label: { type: String }, // Home / Office
    street: { type: String },
    city: { type: String },
    district: { type: String },
    state: { type: String },
    pincode: { type: String },
    phone: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

//user Auth
let userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phonenumber:{
        type:Number,
        required:true
    },

    address:{
        type:String,
    },

    district:{
        type:String,
    },

    state:{
        type:String,
    },

    password:{
        type:String,
        required:true
    },

    userrole:{
        type:String
    },

     // BUYER

     addresses: {
      type: [addressSchema],
      default: [],
    },

    // FARMER
    farmname: { type: String },
    farmlocation: { type: String },
    farmaddress: { type: String },
    farmerimage: {type: String},
    

    bankdetails: {
      bankname: String,
      bankbranch: String,
      ifsccode: String,
      accountnumber: String,
    },
  },
  { timestamps: true }
);



const User = mongoose.model('User', userschema);


export default User;