import User from "../../Models/user.js";

//Get buyer profile

export const getBuyerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select(
      "name email phonenumber"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//update profile
export const updateBuyerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phonenumber } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name, phonenumber },
      { new: true }
    ).select("name email phonenumber");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add address

export const addAddress = async (req, res) => {
  try {
    const userId = req.params.id;
    const address = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If first address → default
    if (user.addresses.length === 0) {
      address.isDefault = true;
    }

    user.addresses.push(address);
    await user.save();

    res.status(201).json({
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("ADD ADDRESS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

//Delete Address

export const deleteAddress = async (req, res) => {
  try {
    const { id, addressId } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.addresses = user.addresses.filter(
      (addr) => addr._id.toString() !== addressId
    );

    await user.save();

    res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete address",
    });
  }
};



//Get Address

export const getAddresses = async (req, res) => {
  try {
    const { id } = req.params;

    const buyer = await User.findById(id).select("addresses");

    if (!buyer) {
      return res.status(404).json({
        success: false,
        message: "Buyer not found",
      });
    }

    res.status(200).json({
      success: true,
      addresses: buyer.addresses || [], // ✅ FIX HERE
    });
  } catch (error) {
    console.error("Get addresses error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch addresses",
    });
  }
};

//Edit Address

export const editAddress = async (req, res) => {
  try {
    const { id, addressId } = req.params;
    const updatedData = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(address, updatedData);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};