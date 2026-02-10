// import React, {useState} from 'react'
// import Navbar from '../../components/buyercomponent.jsx/Navbar';

// const Profile = () => {

//     const [data, setData] = useState({
//         name: '',
//         email: '',
//         phonenumber: '',
//         address: '',
//         district: '',
//         state: '',
//         addresstype: ''
//       });

      

//   const handlechange = (event) => {
//       setData({
//         ...data,
//         [event.target.name]: event.target.value
//       });
//     };
  
  
  
//     const handlesubmit = async (event) => {
//     event.preventDefault();
  
    
//     }
  


//   return (
//     <div className='w-screen min-h-screen bg-green-50 flex justify-center items-center'>
//         <Navbar/>
//         <form
//         onSubmit={handlesubmit} 
//         className="w-[50%] max-w-4xl rounded-2xl bg-gradient-to-b from-green-200/70 via-green-400/60 to-amber-900/30 border-2 border-dotted border-green-900/30 p-10 shadow-amber-950 shadow-2xl">
//             <div className="flex flex-col items-center mb-8">
//                 <h1 className="text-2xl font-bold font-serif text-green-950">
//                     Complete Your Profile
//                 </h1>
//             </div>

//             <div className='space-y-6'>
//                 <div>
//                     <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
//                         Your Fullname/ Organisation
//                     </label>
//                     <input
//                     type="text"
//                     name="name"
//                     value={data.name}
//                     onChange={handlechange}
//                     placeholder="Enter your fullname/organisation name"
//                     className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
//                     placeholder-amber-900 font-mono focus:border-green-700 outline-none"
//                     required/>
//                 </div>

//                 <div>
//                     <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
//                         Your Email
//                     </label>
//                     <input
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     onChange={handlechange}
//                     placeholder="Enter your email"
//                     className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
//                     placeholder-amber-900 font-mono focus:border-green-700 outline-none"
//                     required/>
//                 </div>

//                 <div>
//                     <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
//                         Your Contact
//                     </label>
//                     <input
//                     type="tel"
//                     name="phonenumber"
//                     value={data.phonenumber}
//                     onChange={handlechange}
//                     placeholder="Enter your contact"
//                     className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
//                     placeholder-amber-900 font-mono focus:border-green-700 outline-none"
//                     required/>
//                 </div>

//                 <div>
//                     <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
//                         Your Address
//                     </label>
//                     <input
//                     type="text"
//                     name="address"
//                     value={data.address}
//                     onChange={handlechange}
//                     placeholder="Enter your address"
//                     className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
//                     placeholder-amber-900 font-mono focus:border-green-700 outline-none"
//                     required/>
//                 </div>

//                 <div>
//                     <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
//                         District
//                     </label>
//                     <input
//                     type="text"
//                     name="district"
//                     value={data.district}
//                     onChange={handlechange}
//                     placeholder="district"
//                     className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
//                     placeholder-amber-900 font-mono focus:border-green-700 outline-none"
//                     required/>
//                 </div>

//                 <div>
//                     <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
//                         State
//                     </label>
//                     <input
//                     type="text"
//                     name="state"
//                     value={data.state}
//                     onChange={handlechange}
//                     placeholder="state"
//                     className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
//                     placeholder-amber-900 font-mono focus:border-green-700 outline-none"
//                     required/>
//                 </div>

//                 <div>
//                     <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
//                         Home/Office
//                     </label>
//                     <input
//                     type="text"
//                     name="addresstype"
//                     value={data.addresstype}
//                     onChange={handlechange}
//                     placeholder="Enter your password"
//                     className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
//                     placeholder-amber-900 font-mono focus:border-green-700 outline-none"
//                     required/>
//                 </div>
                

//                 <button
//                 type="submit"
//                 className="w-full mt-15 bg-green-900 hover:bg-amber-900 
//                 text-gray-50 font-bold py-3 rounded-lg  transition duration-300">
//                     Save
//                 </button>
//             </div>

//         </form>

        
//     </div>
//   )
// }

// export default Profile

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Pencil,
  ShoppingBag,
  Heart,
  CreditCard,
} from "lucide-react";
import Navbar from "../../components/buyercomponent.jsx/Navbar";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT PROFILE CARD */}
          <div className="bg-white rounded-xl border p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-green-800 flex items-center justify-center text-white text-3xl font-semibold">
                JD
              </div>

              <h2 className="mt-4 text-xl font-semibold text-green-950">
                John Doe
              </h2>

              <span className="mt-1 px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                Premium Member
              </span>
              
            </div>

            <hr className="my-6" />

            <div className="space-y-4 text-sm text-gray-700">
              <Info icon={<Mail size={16} />} text="john.doe@example.com" />
              <Info icon={<Phone size={16} />} text="+1 (555) 123-4567" />
              <Info
                icon={<MapPin size={16} />}
                text="123 Green Valley Road, Farmington, CA 95035"
              />
              <Info
                icon={<Calendar size={16} />}
                text="Member since January 2024"
              />
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-2 space-y-8">

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard
                icon={<ShoppingBag />}
                value="24"
                label="Total Orders"
              />
              <StatCard
                icon={<Heart />}
                value="8"
                label="Wishlist Items"
              />
              <StatCard
                icon={<CreditCard />}
                value="$1250"
                label="Total Spent"
              />
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-950 mb-6">
                Recent Activity
              </h3>

              <Activity
                title="Placed order"
                desc="Organic Tomatoes - 5kg"
                time="2 hours ago"
              />
              <Activity
                title="Added to wishlist"
                desc="Fresh Strawberries"
                time="1 day ago"
              />
              <Activity
                title="Placed order"
                desc="Farm Fresh Eggs - 30pcs"
                time="3 days ago"
              />
              <Activity
                title="Reviewed"
                desc="Organic Carrots"
                time="1 week ago"
                last
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


const Info = ({ icon, text }) => (
  <div className="flex items-start gap-3">
    <span className="text-green-700 mt-1">{icon}</span>
    <span>{text}</span>
  </div>
);

const StatCard = ({ icon, value, label }) => (
  <div className="bg-white border rounded-xl p-5 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-800">
      {icon}
    </div>
    <div>
      <p className="text-xl font-semibold text-green-950">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

const Activity = ({ title, desc, time, last }) => (
  <div className={`flex justify-between py-4 ${!last && "border-b"}`}>
    <div>
      <p className="font-medium text-green-900">{title}</p>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
    <p className="text-sm text-gray-500">{time}</p>
  </div>
);