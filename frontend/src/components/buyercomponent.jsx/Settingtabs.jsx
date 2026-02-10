import React from 'react'
import { User, Bell, Lock, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

const tabClass = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
   ${
     isActive
       ? "bg-green-100 text-green-900"
       : "text-green-700 hover:bg-green-50"
   }`;

const Settingtabs = () => {
  return (
    <div className="flex gap-3 bg-white p-2 rounded-xl w-fit mb-8">
          <NavLink to="account" className={tabClass}>
            <User size={16} /> Account
          </NavLink>

          <NavLink to="addresses" className={tabClass}>
            <MapPin size={16} /> Addresses
          </NavLink>
        </div>
  )
}

export default Settingtabs