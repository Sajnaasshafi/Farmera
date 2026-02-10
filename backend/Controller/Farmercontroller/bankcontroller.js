import express from "express";
import User from "../../Models/user.js";

// ---------------- GET bank details ----------------
export const getBankDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("bankdetails");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ bankdetails: user.bankdetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- ADD bank details ----------------
export const addBankDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { bankname, bankbranch, ifsccode, accountnumber } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add or overwrite bank details
    user.bankdetails = { bankname, bankbranch, ifsccode, accountnumber };
    await user.save();

    res.status(201).json({ message: "Bank details saved", bankdetails: user.bankdetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------- UPDATE bank details ----------------
export const updateBankDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { bankname, bankbranch, ifsccode, accountnumber } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { bankdetails: { bankname, bankbranch, ifsccode, accountnumber } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Bank details updated", bankdetails: user.bankdetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- DELETE bank details ----------------
export const deleteBankDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bankdetails = {}; // Remove bank details
    await user.save();

    res.status(200).json({ message: "Bank details deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
