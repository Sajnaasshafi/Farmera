import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userlogin } from '../api/api'
import logo from '../assets/logo.png'

const Login = () => {

    const [data, setData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handlechange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handlesubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await userlogin(data)
            console.log(response);
      if(response.data){
        localStorage.setItem("id",response.data._id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("name",response.data.name);
        localStorage.setItem("email",response.data.email);
        localStorage.setItem("phonenumber",response.data.phonenumber);
        localStorage.setItem("userrole", response.data.userrole);
        localStorage.setItem("farmname",response.data.farmname);
        localStorage.setItem("farmerimage",response.data.farmerimage);




        if(response.data.userrole=='admin'){
          navigate('/admin/dashboard')
        }else if(response.data.userrole==='farmer'){
          navigate('/farmer/farmerdashboard')
        }else if(response.data.userrole==='buyer'){
          navigate('/buyer/home')
        }
        else{
          navigate('/');
        }

      }
    } catch (e) {
      console.error('Login failed:', e);
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
                    Login Your Account
                </h1>
            </div>

            <div className='space-y-6'>
                <div>
                    <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
                        Your Email
                    </label>
                    <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handlechange}
                    placeholder="Enter your email"
                    className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
                    required/>
                </div>

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
                    Login
                </button>
            </div>

            <p className="text-center mt-5 text-sm text-green-950">
                Don’t have an account?{" "}
                <Link to="/" className="font-bold font-mono text-amber-900 hover:underline">
                Register
                </Link>
            </p>    


        </form>
    </div>
  )
}

export default Login