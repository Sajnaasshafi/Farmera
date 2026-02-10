import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { MdOutlineDashboard } from "react-icons/md";
import { RiPlantFill } from "react-icons/ri";
import { CiCalendar, CiSettings } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdBorderColor } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getFarmerProfile } from "../../api/api";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const farmerId = localStorage.getItem("id"); // only ID is read

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH FARMER PROFILE ================= */
  useEffect(() => {
    if (!farmerId) {
      toast.error("Farmer not logged in");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getFarmerProfile(farmerId);
        setProfile(response);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load farmer profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [farmerId, navigate]);

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  /* ================= MENU ITEM ================= */
  const menuItem = (to, Icon, label) => {
    const active = location.pathname === to;

    return (
      <Link
        to={to}
        className={`w-full flex items-center px-4 py-2 mt-3 rounded-xl font-mono font-semibold transition
        ${
          active
            ? "bg-green-900 text-white"
            : "text-green-700 hover:bg-green-900 hover:text-white"
        }`}>
        <Icon className="mr-4 text-lg" />
        {label}
      </Link>
    );
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <aside className="w-64 h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </aside>
    );
  }

  if (!profile) return null;

  /* ================= UI ================= */
  return (
    <aside className="w-64 bg-white border-r flex flex-col justify-between h-screen">
      {/* Top */}
      <div>
        <div className="border-b p-4">
          <img src={logo} alt="logo" className="w-32 mx-auto" />
        </div>

        <nav className="px-4 mt-6 space-y-2">
          {menuItem("/farmer/farmerdashboard", MdOutlineDashboard, "Dashboard")}
          {menuItem("/farmer/harvestedcrops", RiPlantFill, "Harvested Crops")}
          {menuItem("/farmer/futureharvestcrops", CiCalendar, "Future Harvest")}
          {menuItem(
            "/farmer/farmerbuyerqueries",
            IoChatbubbleOutline,
            "Buyer Queries",
          )}
          {menuItem("/farmer/orders", MdBorderColor, "Orders")}
          {menuItem("/farmer/farmersettings", CiSettings, "Settings")}
        </nav>
      </div>

      {/* Bottom Profile */}
      <div className="p-4 m-4 bg-green-50 rounded-xl border border-green-100">
        <div className="flex items-center mb-4">
          {profile.farmerimage ? (
            <img
              src={profile.farmerimage}
              alt="Farmer"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-white font-bold">
              {profile.name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="ml-3">
            <p className="font-semibold text-sm text-green-900">
              {profile.name}
            </p>
            <p className="text-xs text-green-700">{profile.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl
          bg-white border border-green-200 text-green-700 font-mono font-semibold
          hover:bg-green-900 hover:text-white transition">
          <LuLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
