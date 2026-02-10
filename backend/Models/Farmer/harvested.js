import mongoose from "mongoose";


let harvestedschema = new mongoose.Schema({

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

    //harvest details
    harvestDate: {
      type: Date,
      required: true,
    },

    availableQuantity: {
      type: Number, // in KG
      required: true,
      min: 1,
    },

    minOrderQuantity: {
      type: Number, // in KG
      default: 1,
    },

    //price details
    pricePerKg: {
      type: Number,
      required: true,
      min: 1,
    },

    negotiable: {
      type: String,
      enum: [ true, false],
      default: false,
    },

    //quality
    grade: {
      type: String,
      enum: ["A", "B", "C"],
      default: "A",
    },

    freshnessLevel: {
      type: String,
      enum: ["Fresh", "1-day old", "2-day old"],
      default: "Fresh",
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

    //status
    status: {
      type: String,
      default: "harvested",
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

const Harvested = mongoose.model('Harvested', harvestedschema);


export default Harvested;