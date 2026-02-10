import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Bell,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  /* ---------- REDUX STATE ---------- */
  const wishlistCount = useSelector(
    (state) => state.wishlist.items.length
  );
  const cartCount = useSelector(
    (state) => state.cart.items.length
  );

  /* ---------- CLOSE DROPDOWN ---------- */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="w-screen bg-white border-b border-green-300 h-20">
      <div className="h-full flex items-center justify-between px-16">

        {/* LOGO */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>

        {/* LINKS */}
        <div className="hidden md:flex gap-10 font-medium">
          {[
            { to: "/buyer/home", label: "Home" },
            { to: "/buyer/shop", label: "Shop" },
            { to: "/buyer/myorder", label: "My Orders" },
            { to: "/buyer/myquery", label: "My Queries" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `pb-1 transition-all duration-300 ${
                  isActive
                    ? "text-green-900 border-b-2 border-green-900 font-semibold"
                    : "text-green-600 hover:text-green-900 border-b-2 border-transparent hover:border-green-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-8">

          {/* WISHLIST */}
          <NavLink to="/buyer/wishlist">
            <IconWithBadge
              icon={<Heart className="w-6 h-6" />}
              count={wishlistCount}
            />
          </NavLink>

          {/* CART */}
          <NavLink to="/buyer/cart">
            <IconWithBadge
              icon={<ShoppingCart className="w-6 h-6" />}
              count={cartCount}
            />
          </NavLink>

          {/* NOTIFICATIONS */}
          <NavLink to="/buyer/notifications">
            <IconWithBadge
              icon={<Bell className="w-6 h-6" />}
              count={0}
            />
          </NavLink>

          {/* USER DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <User
              className="w-6 h-6 cursor-pointer text-green-600 hover:text-green-900"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
            />

            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg py-2 z-50">
                <DropdownItem
                  icon={<User size={18} />}
                  label="My Profile"
                  onClick={() => {
                    setOpen(false);
                    navigate("/buyer/profile");
                  }}
                />

                <DropdownItem
                  icon={<Settings size={18} />}
                  label="Settings"
                  onClick={() => {
                    setOpen(false);
                    navigate("/buyer/settings");
                  }}
                />

                <hr className="my-1" />

                <DropdownItem
                  icon={<LogOut size={18} />}
                  label="Logout"
                  danger
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                />
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

/* ------------------ REUSABLE COMPONENTS ------------------ */

const IconWithBadge = ({ icon, count }) => (
  <div className="relative cursor-pointer text-green-600 hover:text-green-900">
    {icon}

    {/* SHOW BADGE ONLY IF COUNT > 0 */}
    {count > 0 && (
      <span className="absolute -top-2 -right-2 bg-green-900 text-white text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-semibold">
        {count}
      </span>
    )}
  </div>
);

const DropdownItem = ({ icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition ${
      danger
        ? "text-red-600 hover:bg-red-50"
        : "text-gray-700 hover:bg-green-50"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default Navbar;
