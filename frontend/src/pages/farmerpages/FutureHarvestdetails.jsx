import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";

import Sidebar from "../../components/farmercomponets.jsx/Sidebar";
import FutureHarvesttab from "../../components/farmercomponets.jsx/FutureHarvesttab";
import {
  getfutharvestcropdetails,
  updateFutureHarvestCrop,
  deleteFutureHarvestCrop,
} from "../../api/api";

const FutureHarvestdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [crop, setCrop] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  /* ================= FETCH CROP ================= */
  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const data = await getfutharvestcropdetails(id);
        setCrop(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load crop details");
      }
    };

    fetchCrop();
  }, [id]);

  /* ================= EDIT ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) =>
    setImageFile(e.target.files[0]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      [
        "cropname",
        "variety",
        "expectedQuantity",
        "expectedPricePerKg",
        "growthStage",
        "packagingType",
      ].forEach((key) => fd.append(key, formData[key]));

      if (imageFile) fd.append("cropimage", imageFile);

      await updateFutureHarvestCrop(id, fd);

      toast.success("Crop updated successfully 🌱");
      setShowEdit(false);
      setImageFile(null);

      const updated = await getfutharvestcropdetails(id);
      setCrop(updated);
      setFormData(updated);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update crop");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;

    try {
      await deleteFutureHarvestCrop(id);
      toast.success("Crop deleted successfully 🗑️");
      navigate("/farmer/futureharvestcrops/my");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete crop");
    }
  };

  if (!crop) return <p className="p-6">Loading...</p>;

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white">
          <FutureHarvesttab />
        </div>

        <div className="p-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">

            {/* HEADER */}
            <div className="flex font-mono">
              <h1 className="text-2xl font-bold text-green-900">
                {crop.cropname} |
              </h1>
              <h1 className="text-2xl font-bold text-green-700 ml-2">
                {crop.variety} |
              </h1>
              <h1 className="text-2xl font-bold text-green-500 ml-2">
                {crop.category}
              </h1>
            </div>

            <p className="text-sm text-amber-700 mt-2 font-mono">
              Created on: {new Date(crop.createdAt).toLocaleDateString()}
            </p>

            {/* CONTENT */}
            <div className="flex flex-col lg:flex-row gap-10 mt-4">

              {/* LEFT */}
              <div className="lg:w-1/2">
                <img
                  src={crop.cropimage}
                  alt={crop.cropname}
                  className="rounded-xl w-full h-64 object-cover mb-3"
                />

                <div className="flex ml-2 gap-4">
                  <FaRegEdit
                    className="text-lg text-amber-700 cursor-pointer"
                    onClick={() => setShowEdit(true)}
                  />
                  <MdDeleteSweep
                    className="text-xl text-red-600 cursor-pointer"
                    onClick={handleDelete}
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:w-1/2 text-lg space-y-3 font-mono">
                <p><b>Expected on:</b> {crop.expectedHarvestDate}</p>
                <p><b>Expected Quantity:</b> {crop.expectedQuantity} KG</p>
                <p><b>Expected Price:</b> ₹{crop.expectedPricePerKg}</p>
                <p><b>Growth Stage:</b> {crop.growthStage}</p>
                <p><b>Packaging:</b> {crop.packagingType}</p>
                <p><b>Status:</b> {crop.status}</p>
                <p><b>Active:</b> {crop.isActive ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white w-full max-w-xl rounded-xl p-6 space-y-4"
          >
            <h2 className="text-xl font-bold text-green-900">
              Edit Future Harvest Crop
            </h2>

            {[
              ["Crop Name", "cropname"],
              ["Variety", "variety"],
              ["Expected Quantity", "expectedQuantity"],
              ["Expected Price per KG", "expectedPricePerKg"],
              ["Growth Stage", "growthStage"],
              ["Packaging Type", "packagingType"],
            ].map(([label, name]) => (
              <div key={name}>
                <label className="block font-semibold mb-1">{label}</label>
                <input
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ))}

            <div>
              <label className="block font-semibold mb-1">Crop Image</label>
              <input type="file" onChange={handleImageChange} />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FutureHarvestdetails;
