import mongoose from "mongoose";


let profileschema = new mongoose.Schema({

    farmerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

    profimage: {
        type: String
    },    
    
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

    farmname:{
        type:String,
        required:true
    },

    farmlocation:{
        type:String,
        required:true
    },

    farmaddress:{
        type:String,
    },

    //payment
    bankname:{
        type:String,
        required:true
    },

    bankbranch:{
        type:String,
        required:true
    },

    ifsccode:{
        type:String,
        required:true
    },

    accountnumber:{
        type:Number,
        required:true
    },


})

const Profile = mongoose.model('Profile', profileschema);


export default Profile;