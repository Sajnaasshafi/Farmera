import React, { useState, useEffect } from "react";

const BankModal = ({ isOpen, onSave, onClose, initialData }) => {
  // ✅ Lazy initialize form state
  const [formData, setFormData] = useState(() => ({
    bankname: initialData?.bankname || "",
    bankbranch: initialData?.bankbranch || "",
    ifsccode: initialData?.ifsccode || "",
    accountnumber: initialData?.accountnumber || "",
  }));

  // ✅ Update form when initialData changes
  useEffect(() => {
    if (!initialData) return;

    // Avoid calling setState synchronously in render
    const id = setTimeout(() => {
      setFormData({
        bankname: initialData.bankname || "",
        bankbranch: initialData.bankbranch || "",
        ifsccode: initialData.ifsccode || "",
        accountnumber: initialData.accountnumber || "",
      });
    }, 0);

    return () => clearTimeout(id);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          {initialData ? "Edit Bank Details" : "Add Bank Details"}
        </h3>

        <input
          name="bankname"
          placeholder="Bank Name"
          value={formData.bankname}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="bankbranch"
          placeholder="Branch"
          value={formData.bankbranch}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="ifsccode"
          placeholder="IFSC Code"
          value={formData.ifsccode}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="accountnumber"
          placeholder="Account Number"
          value={formData.accountnumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankModal;
