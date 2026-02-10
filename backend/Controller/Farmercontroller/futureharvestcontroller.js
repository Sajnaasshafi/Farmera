import FutureHarvest from "../../Models/Farmer/futureharvest.js";

//farmer adding crop
export const addmyfutcrop = async (req, res) => {
  try {
    const farmerId = req.params.id; // ✅ FIXED

    const {
      cropname,
      variety,
      category,
      expectedHarvestDate,
      expectedQuantity,
      expectedPricePerKg,
      growthStage,
      negotiable,
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
      !expectedHarvestDate ||
      expectedQuantity === undefined ||
      expectedPricePerKg === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const harvestedCrop = await FutureHarvest.create({
      farmerId,
      cropname,
      variety,
      category,
      expectedHarvestDate,
      expectedQuantity,
      expectedPricePerKg,
      growthStage,
      negotiable,
      deliveryAvailable,
      pickupAvailable,
      packagingType,
      status,
      isActive,
      cropimage: req.file ? req.file.path : null, // Cloudinary URL
    });

    res.status(201).json({
      success: true,
      message: "Future crop added successfully",
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



//farmers mycrop of future
export const viewmyfutcrop = async (req, res) => {
  const farmerId = req.params.id;

  if (!farmerId) {
    return res.status(400).json({ message: "Farmer id missing" });
  }

  try {
    const mycrops = await FutureHarvest.find({ farmerId });

    return res.status(200).json(mycrops); // always return array
  } catch (e) {
    console.error("🔥 VIEW MY CROPS ERROR:", e);
    res.status(500).json({ error: e.message });
  }
};


//Editing mycrop
export const updatemycrop = async (req, res) => {
  const { id } = req.params;

  try {
    const updateData = { ...req.body };

    // ✅ if image uploaded, save path
    if (req.file) {
      updateData.cropimage = req.file.path;
    }

    const updatedCrop = await FutureHarvest.findByIdAndUpdate(
      id,
      updateData,
      { new: true } 
    );

    res.json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Deleting mycrop
export const deletemycrop = async(req,res)=>{
    let id = req.params.id;
    try{
        let deletedcrop = await FutureHarvest.findByIdAndDelete(id);
        res.json(deletedcrop);
    }
    catch(e){
        res.status(500).json(e.message)
    }
}

//view all farmers futer harvest crop
export const viewallfutharvestcrops = async (req, res) => {
  try {
    const futureHarvestCrops = await FutureHarvest.find()
      .populate({
        path: "farmerId",
        select: "name email farmName farmLocation",
      });

    res.status(200).json(futureHarvestCrops);
  } catch (error) {
    console.error("Fetch future harvest crops error:", error);
    res.status(500).json({ message: error.message });
  }
};


//Harvested crop details
export const futharvestcropdetails = async (req, res) => {
  const id = req.params.id;

  try {
    const cropdetails = await FutureHarvest
      .findById(id)
      .populate("farmerId", "_id name email"); // 👈 populate User

    if (!cropdetails) {
      return res.status(404).json({ message: "Future harvest not found" });
    }

    res.status(200).json(cropdetails);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
