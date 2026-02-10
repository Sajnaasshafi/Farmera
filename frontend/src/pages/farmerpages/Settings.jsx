import React, { useEffect, useState } from "react";
import Sidebar from "../../components/farmercomponets.jsx/Sidebar";
import Settingsheader from "../../components/farmercomponets.jsx/Settingsheader";
import { User, Lock, MapPin } from "lucide-react";
import { PiFarm } from "react-icons/pi";
import { IoLocateSharp } from "react-icons/io5";
import { getFarmerProfile, updateFarmerProfile } from "../../api/api";
import { toast } from "react-toastify";
import BankDetails from "./BankDetails";

const FarmerSettings = () => {
  const farmerId = localStorage.getItem("id");

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getFarmerProfile(farmerId);
        setProfile(data);
        setFormData(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [farmerId]);

  /* ================= EDIT HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("farmname", formData.farmname);
      fd.append("farmlocation", formData.farmlocation);
      fd.append("farmaddress", formData.farmaddress);

      if (imageFile) fd.append("farmerimage", imageFile);

      await updateFarmerProfile(farmerId, fd);

      toast.success("Profile updated successfully 🌱");
      setShowEdit(false);
      setImageFile(null);

      const updated = await getFarmerProfile(farmerId);
      setProfile(updated);
      setFormData(updated);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading)
    return (
      <p className="mt-20 text-center text-gray-700">Loading profile...</p>
    );

  if (!profile) return null;

  return (
    <div className="w-screen h-screen flex bg-green-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white">
          <Settingsheader />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-green-950 mb-6">
              Farmer Profile
            </h1>

            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-200">
                {profile.farmerimage ? (
                  <img
                    src={profile.farmerimage}
                    alt="Farmer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-700">
                    <User size={48} />
                  </div>
                )}
              </div>
            </div>

            {/* DETAILS WITH ICONS */}
            <div className="space-y-4 font-mono text-gray-700">
              <div className="flex items-center gap-4">
                <User className="text-green-700" />
                <p>{profile.name}</p>
              </div>

              <div className="flex items-center gap-4">
                <Lock className="text-green-700" />
                <p>{profile.email}</p>
              </div>

              <div className="flex items-center gap-4">
                <PiFarm className="text-green-700" />
                <p>{profile.farmname}</p>
              </div>

              <div className="flex items-center gap-4">
                <IoLocateSharp className="text-green-700" />
                <p>{profile.farmlocation}</p>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-green-700" />
                <p>{profile.farmaddress}</p>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowEdit(true)}
                className="px-4 py-2 rounded bg-green-900 text-white hover:bg-green-800">
                Edit Profile
              </button>
            </div>
          </div>

          <BankDetails />
        </div>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white w-full max-w-xl rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-green-900">Edit Profile</h2>

            {[
              ["Name", "name"],
              ["Farm Name", "farmname"],
              ["Farm Location", "farmlocation"],
              ["Farm Address", "farmaddress"],
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
              <label className="block font-semibold mb-1">Profile Image</label>
              <input type="file" onChange={handleImageChange} />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 border rounded-lg">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white rounded-lg">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FarmerSettings;
