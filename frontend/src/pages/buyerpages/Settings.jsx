import React, { useEffect, useState } from "react";
import Sidebar from "../../components/farmercomponets.jsx/Sidebar";
import Settingsheader from "../../components/farmercomponets.jsx/Settingsheader";
import { User, MapPin, Lock } from "lucide-react";
import { getFarmerProfile, updateFarmerProfile } from "../../api/api";
import { toast } from "react-toastify";

const FarmerSettings = () => {
  const farmerId = localStorage.getItem("id");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    farmname: "",
    farmlocation: "",
    farmaddress: "",
    farmerimage: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getFarmerProfile(farmerId);
        console.log("Fetched profile:", data); // debug
        setProfile({
          name: data.name || "",
          email: data.email || "",
          farmname: data.farmname || "",
          farmlocation: data.farmlocation || "",
          farmaddress: data.farmaddress || "",
          farmerimage: data.farmerimage || "",
        });
        setImagePreview(data.farmerimage || "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [farmerId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, farmerimage: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("farmname", profile.farmname);
      formData.append("farmlocation", profile.farmlocation);
      formData.append("farmaddress", profile.farmaddress);

      if (profile.farmerimage instanceof File) {
        formData.append("profimage", profile.farmerimage);
      }

      await updateFarmerProfile(farmerId, formData);
      toast.success("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p className="mt-20 text-center">Loading profile...</p>;

  return (
    <div className="w-screen h-screen flex bg-green-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="sticky top-0 z-50 bg-white">
          <Settingsheader />
        </div>

        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-green-950 mb-6">
              Farmer Profile
            </h1>

            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-200">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Farmer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-700 font-bold">
                    <User size={48} />
                  </div>
                )}
              </div>
            </div>

            {editing && (
              <div className="flex justify-center mb-6">
                <input type="file" onChange={handleImageChange} accept="image/*" />
              </div>
            )}

            {/* Name */}
            <div className="flex items-center gap-4 mb-4">
              <User className="text-green-700" />
              {editing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full"
                />
              ) : (
                <p className="text-gray-700">{profile.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 mb-4">
              <Lock className="text-green-700" />
              <p className="text-gray-700">{profile.email}</p>
            </div>

            {/* Farm Name */}
            <div className="flex items-center gap-4 mb-4">
              <User className="text-green-700" />
              {editing ? (
                <input
                  type="text"
                  value={profile.farmname}
                  onChange={(e) =>
                    setProfile({ ...profile, farmname: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Farm Name"
                />
              ) : (
                <p className="text-gray-700">{profile.farmname || "Not set"}</p>
              )}
            </div>

            {/* Farm Location */}
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="text-green-700" />
              {editing ? (
                <input
                  type="text"
                  value={profile.farmlocation}
                  onChange={(e) =>
                    setProfile({ ...profile, farmlocation: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Farm Location"
                />
              ) : (
                <p className="text-gray-700">{profile.farmlocation || "Not set"}</p>
              )}
            </div>

            {/* Farm Address */}
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="text-green-700" />
              {editing ? (
                <input
                  type="text"
                  value={profile.farmaddress}
                  onChange={(e) =>
                    setProfile({ ...profile, farmaddress: e.target.value })
                  }
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Farm Address"
                />
              ) : (
                <p className="text-gray-700">{profile.farmaddress || "Not set"}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              {editing ? (
                <>
                  <button
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-green-900 text-white hover:bg-green-800"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  className="px-4 py-2 rounded bg-green-900 text-white hover:bg-green-800"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerSettings;
