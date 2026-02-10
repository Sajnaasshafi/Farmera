import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

import Sidebar from "../../components/farmercomponets.jsx/Sidebar";
import Harvestedheader from "../../components/farmercomponets.jsx/Harvestedheader";

import {
  getharvestedcropdetails,
  updatemycrop,
  deletemycrop,
} from "../../api/api";

const Harvesteddetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crop, setcrop] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchcrop = async () => {
      try {
        const data = await getharvestedcropdetails(id);
        setcrop(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchcrop();
  }, [id]);

  const handleEditOpen = () => {
    setFormData({ ...crop });
    setIsEditOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updated = await updatemycrop(crop._id, formData);
      setcrop(updated);
      setIsEditOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;
    try {
      await deletemycrop(crop._id);
      navigate("/farmer/harvestedcrops/my");
    } catch (error) {
      console.error(error);
    }
  };

  if (!crop) return <p className="p-6">Loading...</p>;

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white">
          <Harvestedheader />
        </div>

        <div className="p-6">
          <div className="rounded-lg p-6 shadow-sm bg-white">

            {/* TITLE */}
            <div className="flex flex-wrap">
              <h1 className="text-2xl font-bold text-green-900 font-mono">
                {crop.cropname} |
              </h1>
              <h1 className="text-2xl font-bold text-green-700 ml-2 font-mono">
                {crop.variety} |
              </h1>
              <h1 className="text-2xl font-bold text-green-500 ml-2 font-mono">
                {crop.category}
              </h1>
            </div>

            <p className="text-sm text-amber-700 mt-2 font-mono">
              Created on: {new Date(crop.createdAt).toLocaleDateString()}
            </p>

            {/* CONTENT */}
            <div className="flex flex-col lg:flex-row gap-10 mt-6">
              {/* LEFT */}
              <div className="lg:w-1/2">
                <img
                  src={crop.cropimage}
                  alt={crop.cropname}
                  className="rounded-xl w-full h-64 object-cover"
                />

                <div className="flex gap-5 mt-4 ml-2">
                  <FaRegEdit
                    onClick={handleEditOpen}
                    className="text-xl text-amber-700 cursor-pointer hover:scale-110"
                  />
                  <MdDeleteSweep
                    onClick={handleDelete}
                    className="text-2xl text-red-600 cursor-pointer hover:scale-110"
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:w-1/2 space-y-2 font-mono text-green-900">
                <p>Harvest Date: <span className="text-amber-900">{crop.harvestDate}</span></p>
                <p>Available Quantity: <span className="text-amber-900">{crop.availableQuantity} KG</span></p>
                <p>Min Order Quantity: <span className="text-amber-900">{crop.minOrderQuantity} KG</span></p>
                <p>Price per KG: <span className="text-amber-900">{crop.pricePerKg}</span></p>
                <p>Grade: <span className="text-amber-900">{crop.grade}</span></p>
                <p>Freshness Level: <span className="text-amber-900">{crop.freshnessLevel}</span></p>
                <p>Packaging Type: <span className="text-amber-900">{crop.packagingType}</span></p>
                <p>Status: <span className="text-amber-900">{crop.status}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[480px] max-h-[90vh] overflow-y-auto space-y-4">

            <h2 className="text-xl font-bold text-green-900">Edit Crop</h2>

            {/* INPUT GROUP */}
            {[
              ["Crop Name", "cropname"],
              ["Variety", "variety"],
              ["Category", "category"],
              ["Harvest Date", "harvestDate"],
              ["Available Quantity (KG)", "availableQuantity"],
              ["Min Order Quantity (KG)", "minOrderQuantity"],
              ["Price per KG", "pricePerKg"],
              ["Grade", "grade"],
              ["Freshness Level", "freshnessLevel"],
              ["Packaging Type", "packagingType"],
            ].map(([label, name]) => (
              <div key={name}>
                <label className="block text-sm font-medium text-green-900 mb-1">
                  {label}
                </label>
                <input
                  type="text"
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}

            {/* IMAGE URL */}
            <div>
              <label className="block text-sm font-medium text-green-900 mb-1">
                Crop Image URL
              </label>
              <input
                type="text"
                name="cropimage"
                value={formData.cropimage || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {formData.cropimage && (
                <img
                  src={formData.cropimage}
                  alt="preview"
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
            </div>

            {/* STATUS */}
            <div>
              <label className="block text-sm font-medium text-green-900 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-green-700 text-white"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Harvesteddetails;
