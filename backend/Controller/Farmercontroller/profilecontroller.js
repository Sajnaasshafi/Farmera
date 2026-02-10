import User from "../../Models/user.js";

// ---------------- GET Farmer Profile ----------------
export const getFarmerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const farmer = await User.findById(id).select(
      "name email phonenumber farmname farmlocation farmaddress farmerimage",
    );

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- UPDATE Farmer Profile ----------------
export const updateFarmerProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const updateData = { ...req.body };

    // ✅ if image uploaded, save path
    if (req.file) {
      updateData.farmerimage = req.file.path;
    }

    const updatedCrop = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
