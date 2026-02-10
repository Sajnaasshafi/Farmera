import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getbuyerprofile, updatebuyerprofile } from "../../../api/api";

const ProfileEdit = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });

  const id = localStorage.getItem("id");

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getbuyerprofile(id);

      setData({
        name: res.name || "",
        email: res.email || "",
        phonenumber: res.phonenumber || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    }
  };

  if (id) fetchProfile();
}, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatebuyerprofile(id, {
        name: data.name,
        phonenumber: data.phonenumber,
      });
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold text-green-950 mb-1">
        Account Information
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="mt-6">
          <label>Email</label>
          <input
            type="email"
            value={data.email}
            disabled
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="mt-6">
          <label>Phone</label>
          <input
            type="tel"
            name="phonenumber"
            value={data.phonenumber}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button className="mt-8 bg-green-900 text-white px-6 py-3 rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
