import mongoose from "mongoose";


let futureharvestschema = new mongoose.Schema({

    //farmerid
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    //crop details
    cropname:{
        type:String,
        required:true,
        trim: true
    },

    variety:{
        type:String,
        required:true,
        trim:true
    },

    category: {
      type: String,
      enum: ["Vegetable", "Fruit", "Grain", "Spice", "Pulse"],
      required: true,
    },

    //harvest expect details
     expectedHarvestDate: {
     type: Date,
     required: true,
    },

    expectedQuantity: {
     type: Number, // in KG
     required: true,
     min: 1,
    },

    growthStage: {
     type: String,
     enum: ["Seeded", "Growing", "Flowering", "ReadySoon"],
     default: "Growing",
    },

    //price details
    expectedPricePerKg: {
    type: Number,
    required: true,
    min: 1,
  },

    negotiable: {
      type: String,
      enum: [ true, false],
      default: false,
    },


    //delivery
    deliveryAvailable: {
      type: String,
      enum: [ true, false],
      default: true,
    },

    pickupAvailable: {
      type: String,
      enum: [ true, false],
      default: true,
    },

    //packaging
    packagingType: {
      type: String,
      enum: ["Bag", "Box", "Loose"],
      default: "Bag",
    },

    //image
    cropimage: {
        type: String
    },

    // img1: {
    //     type: String
    // },

    // img2: {
    //     type: String
    // },

    //status
    status: {
      type: String,
      default: "Future",
      immutable: true,
    },

    isActive: {
      type: String,
      enum: [ true, false],
      default: true,
    },

    createdAt: {
    type: Date,
    default: Date.now
  }

})

const FutureHarvest = mongoose.model('FutureHarvest', futureharvestschema);


export default FutureHarvest;