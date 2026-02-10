import React, { useEffect, useState } from "react";
import { Trash2, Pencil, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

import BankModal from "../farmerpages/BankModal";
import {
  getBankDetails,
  addBankDetails,
  updateBankDetails,
  deleteBankDetails,
} from "../../api/api";

const BankDetails = () => {
  const farmerId = localStorage.getItem("id"); // logged-in farmer ID

  const [bank, setBank] = useState(null); // current bank details
  const [modalOpen, setModalOpen] = useState(false); // modal visibility
  const [isEdit, setIsEdit] = useState(false); // edit or add mode

  /* ---------------- LOAD BANK DETAILS ---------------- */
  useEffect(() => {
    if (!farmerId) return;

    const loadBank = async () => {
      try {
        const res = await getBankDetails(farmerId);
        setBank(res.bankdetails || null);
      } catch {
        toast.error("Failed to load bank details");
      }
    };

    loadBank();
  }, [farmerId]);

  /* ---------------- SAVE (ADD OR EDIT) ---------------- */
  const handleSave = async (formData) => {
    try {
      let res;
      if (isEdit && bank) {
        // EDIT existing bank
        res = await updateBankDetails(farmerId, formData);
        toast.success("Bank details updated");
      } else {
        // ADD new bank
        res = await addBankDetails(farmerId, formData);
        toast.success("Bank details added");
      }

      setBank(res.bankdetails);
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save bank details");
    }
  };

  /* ---------------- DELETE BANK ---------------- */
  const handleDelete = async () => {
    if (!window.confirm("Delete bank details?")) return;

    try {
      await deleteBankDetails(farmerId);
      setBank(null);
      toast.success("Bank details deleted");
    } catch {
      toast.error("Failed to delete bank details");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-green-950 mb-4">Bank Details</h2>
      <p className="text-gray-600 mb-6">
        Manage your bank details for payments
      </p>

      {/* ---------------- Bank Card ---------------- */}
      {bank ? (
        <div className="border rounded-xl p-5 mb-4 flex justify-between items-start bg-green-50 border-green-500">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <CreditCard size={18} /> {bank.bankname}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Branch: {bank.bankbranch} <br />
              IFSC: {bank.ifsccode} <br />
              Account No: {bank.accountnumber}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsEdit(true); // EDIT mode
                setModalOpen(true);
              }}
              className="border px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={handleDelete}
              className="border px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="border rounded-xl p-5 mb-4 flex items-center justify-center bg-green-50 border-dashed border-green-300 cursor-pointer hover:bg-green-100 text-green-700 font-semibold"
          onClick={() => {
            setIsEdit(false); // ADD mode
            setModalOpen(true);
          }}
        >
          <CreditCard size={18} className="mr-2" />
          Add Bank Details
        </div>
      )}

      {/* ---------------- Bank Modal ---------------- */}
      <BankModal
        key={isEdit ? bank?._id : "new"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={isEdit ? bank : null} 
      />
    </div>
  );
};

export default BankDetails;
