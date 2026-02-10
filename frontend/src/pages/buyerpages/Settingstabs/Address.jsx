import React, { useEffect, useState } from "react";
import { MapPin, Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";

import AddressModal from "./AddressModal";
import {
  addAddress,
  editAddress,
  getAddresses,
  deleteAddress,
} from "../../../api/api";

const Address = () => {
  const userId = localStorage.getItem("id");

  const [addresses, setAddresses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);

  /* ✅ LOAD ADDRESSES */
  useEffect(() => {
    if (!userId) return;

    const loadAddresses = async () => {
      try {
        const res = await getAddresses(userId);
        setAddresses(res.data.addresses || []);
      } catch {
        toast.error("Failed to load addresses");
      }
    };

    loadAddresses();
  }, [userId]);

  /* ✅ SAVE (ADD / EDIT) */
  const handleSave = async (formData) => {
    try {
      if (editAddressData) {
        await editAddress(userId, editAddressData._id, formData);
        toast.success("Address updated");
      } else {
        await addAddress(userId, formData);
        toast.success("Address added");
      }

      setModalOpen(false);
      setEditAddressData(null);

      const res = await getAddresses(userId);
      setAddresses(res.data.addresses || []);
    } catch {
      toast.error("Failed to save address");
    }
  };

  /* ✅ DELETE */
  const handleDelete = async (addressId) => {
  if (!window.confirm("Delete this address?")) return;

  try {
    const res = await deleteAddress(userId, addressId);
    setAddresses(res.data.addresses);
    toast.success("Address deleted");
  } catch {
    toast.error("Failed to delete address");
  }
};

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold text-green-950 mb-1">
        Saved Addresses
      </h2>
      <p className="text-gray-600 mb-6">
        Manage your delivery addresses
      </p>

      {addresses.length === 0 && (
        <p className="text-gray-500 text-sm">
          No addresses added yet.
        </p>
      )}

      {addresses.map((addr) => (
        <div
          key={addr._id}
          className={`border rounded-xl p-5 mb-4 flex justify-between items-start
            ${addr.isDefault ? "border-green-500 bg-green-50" : ""}`}
        >
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{addr.label}</h3>

              {addr.isDefault && (
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                  Default
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {addr.street}
              <br />
              {addr.city}, {addr.state} {addr.pincode}
              <br />
              Phone: {addr.phone}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditAddressData(addr);
                setModalOpen(true);
              }}
              className="border px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() => handleDelete(addr._id)}
              className="border px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => {
          setEditAddressData(null);
          setModalOpen(true);
        }}
        className="w-full border-2 border-dashed rounded-xl py-4 flex items-center justify-center gap-2 text-green-900 hover:bg-green-50"
      >
        <MapPin size={18} />
        Add New Address
      </button>

      <AddressModal
  key={editAddressData?._id || "new"}   
  isOpen={modalOpen}
  onClose={() => {
    setModalOpen(false);
    setEditAddressData(null);
  }}
  onSave={handleSave}
  initialData={editAddressData}
/>
    </div>
  );
};

export default Address;
