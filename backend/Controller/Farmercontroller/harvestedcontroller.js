import Harvested from "../../Models/Farmer/harvested.js";

//farmer adding crop
export const addmycrop = async (req, res) => {
  try {
    const farmerId = req.params.id; 

    const {
      cropname,
      variety,
      category,
      harvestDate,
      availableQuantity,
      minOrderQuantity,
      pricePerKg,
      negotiable,
      grade,
      freshnessLevel,
      deliveryAvailable,
      pickupAvailable,
      packagingType,
      status,
      isActive
    } = req.body;

    // validation
    if (
      !farmerId ||
      !cropname ||
      !variety ||
      !category ||
      !harvestDate ||
      availableQuantity === undefined ||
      pricePerKg === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const harvestedCrop = await Harvested.create({
      farmerId,
      cropname,
      variety,
      category,
      harvestDate,
      availableQuantity,
      minOrderQuantity,
      pricePerKg,
      negotiable,
      grade,
      freshnessLevel,
      deliveryAvailable,
      pickupAvailable,
      packagingType,
      status,
      isActive,
      cropimage: req.file ? req.file.path : null, // Cloudinary URL
    });

    res.status(201).json({
      success: true,
      message: "Harvested crop added successfully",
      data: harvestedCrop,
    });

  } catch (error) {
    console.error("🔥 BACKEND ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};



//farmers mycrop
export const viewmycrop = async (req, res) => {
  const farmerId = req.params.id;

  if (!farmerId) {
    return res.status(400).json({ message: "Farmer id missing" });
  }

  try {
    const mycrops = await Harvested.find({ farmerId });

    return res.status(200).json(mycrops); // always return array
  } catch (e) {
    console.error("🔥 VIEW MY CROPS ERROR:", e);
    res.status(500).json({ error: e.message });
  }
};


//Editing mycrop
export const updatemycrop = async(req,res)=>{
    let id = req.params.id;
    try{
        let updatecrop = await Harvested.findByIdAndUpdate(id,req.body);
        res.json(updatecrop)
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

//Deleting mycrop
export const deletemycrop = async(req,res)=>{
    let id = req.params.id;
    try{
        let deletedcrop = await Harvested.findByIdAndDelete(id);
        res.json(deletedcrop);
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

//view all farmers harvested crop
export const viewallharvestedcrops = async (req, res) => {
  try {
    const harvestedCrops = await Harvested.find()
      .populate({
        path: "farmerId",
        select: "name email farmName farmLocation farmerimage",
      });

    res.status(200).json(harvestedCrops);
  } catch (error) {
    console.error("Fetch harvested crops error:", error);
    res.status(500).json({ message: error.message });
  }
};

//Harvested crop details
export const harvestedcropdetails = async (req, res) => {
  const id = req.params.id;

  try {
    const cropdetails = await Harvested
      .findById(id)
      .populate("farmerId", "_id name email");

    if (!cropdetails) {
      return res.status(404).json({ message: "Harvested crop not found" });
    }

    res.status(200).json(cropdetails);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
