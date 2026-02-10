import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.png'
import { userregister } from '../../api/api'

const Signin = () => {

    const [data, setData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    address: '',
    district: '',
    state: '',
    password: ''
  });

  const navigate = useNavigate();

  const handlechange = (event) => {
      setData({
        ...data,
        [event.target.name]: event.target.value
      });
    };
  
    const dataWithuserrole = {
        ...data,
        userrole: 'buyer',
      };
  
  
    const handlesubmit = async (event) => {
    event.preventDefault();
  
    if (!data.name || !data.email || !data.password) {
      toast.warning("⚠️ Please fill all required fields");
      return;
    }
  
    try {
      await userregister(dataWithuserrole);
      toast.success("✅ Registered successfully!");
  
      setTimeout(() => {
        navigate('/login');
      }, 3000);
  
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Registration failed!");
    }
  };


  return (
    <div className='w-screen min-h-screen bg-green-50 flex justify-center items-center'>
        <form 
        onSubmit={handlesubmit} 
        className="w-[50%] max-w-4xl rounded-2xl bg-gradient-to-b from-green-200/70 via-green-400/60 to-amber-900/30 border-2 border-dotted border-green-900/30 p-10 shadow-amber-950 shadow-2xl">
            <div className="flex flex-col items-center mb-8">
                <img className="h-32 w-auto " src={logo} alt="logo" />
                <h1 className="text-2xl font-bold font-serif text-green-950">
                    Create Your Account
                </h1>
            </div>

            <div className='space-y-6'>
                <div>
                    <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
                        Your Fullname
                    </label>
                    <input
                    type="name"
                    name="name"
                    onChange={handlechange}
                    value={data.name}
                    placeholder="Enter your fullname"
                    className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
                    required/>
                </div>

                <div>
                    <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
                        Your Email
                    </label>
                    <input
                    type="email"
                    name="email"
                    onChange={handlechange}
                    value={data.email}
                    placeholder="Enter your email"
                    className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
                    required/>
                </div>

                <div>
                    <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
                        Your Contact
                    </label>
                    <input
                    type="tel"
                    name="phonenumber"
                    onChange={handlechange}
                    value={data.phonenumber}
                    placeholder="Enter your contact"
                    className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
                    required/>
                </div>

                {/* <div>
                    <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
                        Your Address
                    </label>
                    <input
                    type="text"
                    name="address"
                    value={data.address}
                    onChange={handlechange}
                    placeholder="Enter your address"
                    className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
                        District
                    </label>
                    <input
                    type="text"
                    name="district"
                    value={data.district}
                    onChange={handlechange}
                    placeholder="district"
                    className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
                        State
                    </label>
                    <input
                    type="text"
                    name="state"
                    value={data.state}
                    onChange={handlechange}
                    placeholder="state"
                    className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
                    />
                </div> */}

                <div>
                    <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
                        Your Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handlechange}
                    placeholder="Enter your password"
                    className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
                    required/>
                </div>
                

                <button
                type="submit"
                className="w-full mt-15 bg-green-900 hover:bg-amber-900 
                text-gray-50 font-bold py-3 rounded-lg  transition duration-300">
                    Register
                </button>
            </div>

            <p className="text-center mt-5 text-sm text-green-950">
                Already have an account?{" "}
                <Link to="/login" className="font-bold font-mono text-amber-900 hover:underline">
                Login
                </Link>
            </p>    


        </form>
    </div>
  )
}

export default Signin
