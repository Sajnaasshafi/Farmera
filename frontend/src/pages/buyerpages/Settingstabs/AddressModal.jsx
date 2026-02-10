import React, { useState } from "react";

const AddressModal = ({ isOpen, onSave, onClose, initialData }) => {
  const [formData, setFormData] = useState(() => ({
    label: initialData?.label || "",
    street: initialData?.street || "",
    city: initialData?.city || "",
    district: initialData?.district || "",
    state: initialData?.state || "",
    pincode: initialData?.pincode || "",
    phone: initialData?.phone || "",
    isDefault: initialData?.isDefault || false,
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-md space-y-3"
      >
        <h3 className="text-lg font-semibold">
          {initialData ? "Edit Address" : "Add Address"}
        </h3>

        <input
          name="label"
          placeholder="Label (Home, Office)"
          value={formData.label}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
          />
          Default address
        </label>

        <div className="flex justify-end gap-3 pt-3">
          <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressModal;
