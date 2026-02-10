import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import { userregister } from "../../api/api";

const Signin = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    farmname: "",
    farmlocation: "",
    farmaddress: "",
    password: "",
    farmerimage: null,
  });

  const navigate = useNavigate();

  /* ---------- INPUT CHANGE ---------- */
  const handlechange = (e) => {
    const { name, value, files } = e.target;

    if (name === "farmerimage") {
      setData({ ...data, farmerimage: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  /* ---------- SUBMIT ---------- */
  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      toast.warning("⚠️ Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phonenumber", data.phonenumber);
      formData.append("farmname", data.farmname);
      formData.append("farmlocation", data.farmlocation);
      formData.append("farmaddress", data.farmaddress);
      formData.append("password", data.password);
      formData.append("userrole", "farmer");

      if (data.farmerimage) {
        formData.append("farmerimage", data.farmerimage);
      }

      await userregister(formData);

      toast.success("✅ Registered successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "❌ Registration failed!"
      );
    }
  };

  return (
    <div className="w-screen min-h-screen bg-green-50 flex justify-center items-center">
      <form
        onSubmit={handlesubmit}
        className="w-[50%] max-w-4xl rounded-2xl bg-gradient-to-b from-green-200/70 via-green-400/60 to-amber-900/30 border-2 border-dotted border-green-900/30 p-10 shadow-amber-950 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <img className="h-32 w-auto" src={logo} alt="logo" />
          <h1 className="text-2xl font-bold font-serif text-green-950">
            Create Your Account
          </h1>
        </div>

        <div className="space-y-6">
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handlechange}
            required
            className="w-full input"
          />

          {/* PROFILE IMAGE */}
          <input
            type="file"
            name="farmerimage"
            accept="image/*"
            onChange={handlechange}
            className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 font-mono"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handlechange}
            required
            className="w-full input"
          />

          {/* PHONE */}
          <input
            type="tel"
            name="phonenumber"
            placeholder="Phone Number"
            onChange={handlechange}
            required
            className="w-full input"
          />

          {/* FARM NAME */}
          <input
            type="text"
            name="farmname"
            placeholder="Farm Name"
            onChange={handlechange}
            required
            className="w-full input"
          />

          {/* FARM LOCATION */}
          <input
            type="text"
            name="farmlocation"
            placeholder="Farm Location"
            onChange={handlechange}
            required
            className="w-full input"
          />

          {/* FARM ADDRESS */}
          <input
            type="text"
            name="farmaddress"
            placeholder="Farm Address"
            onChange={handlechange}
            required
            className="w-full input"
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handlechange}
            required
            className="w-full input"
          />

          <button
            type="submit"
            className="w-full bg-green-900 hover:bg-amber-900 text-white font-bold py-3 rounded-lg transition"
          >
            Register
          </button>
        </div>

        <p className="text-center mt-5 text-sm text-green-950">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-amber-900 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Signin;
