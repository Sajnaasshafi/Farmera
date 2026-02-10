import React  from 'react'
import bgimage from '../assets/backgroundimage.png'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {

    const navigate = useNavigate()


  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          `url(${bgimage})`
      }}
    >
      <div className='absolute inset-0  bg-black/20 backdrop-blur-sm'>
      <div className="w-full flex items-center justify-between px-4">
        <div className='ml-3'>
          <img className='h-40 w-60' src={logo} alt="logo" />
        </div>
        <ul className='flex gap-8 mr-14 text-lg font-bold'>
          <li className='text-green-950 hover:text-green-50 hover:scale-110 transition-transform duration-300 hover:underline decoration-green-50'>Home</li>
          <li className='text-green-950 hover:text-green-50 hover:scale-110 transition-transform duration-300 hover:underline decoration-green-50'>About us</li>
          <li className='text-green-950 hover:text-green-50 hover:scale-110 transition-transform duration-300 hover:underline decoration-green-50'>Contact us</li>
          <li>
            <Link to='/login'>
            <button className="px-4 py-1 text-green-950 font-bold bg-green-50 border-2 border-green-950 rounded-lg transition-all duration-300 hover:bg-green-950 hover:text-green-50 hover:scale-105">
              Login
            </button>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-[50%] max-w-4xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 p-10 text-center shadow-xl">
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-4">
            Connect Farms to Markets
          </h1>

          <p className="text-white/90 text-lg mb-8">
            Empowering farmers and buyers with a transparent,<br></br>
            fair,and direct agricultural marketplace.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
          <button 
          onClick={() => navigate('/buyersignin')}
          className="px-6 py-3 rounded-lg bg-yellow-400 text-green-900 font-semibold shadow hover:bg-yellow-300 transition">
            Sign Up as Buyer
          </button>
          <button
          onClick={() => navigate('/farmersignin')}
          className="px-6 py-3 rounded-lg bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition">
            Sign Up as Farmer
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-8 border-t border-white/30 pt-6 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">📦</span>
            <span>Track your orders</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <span>Manage your crops</span>
          </div>
        </div>

        </div>
      </div>

      </div>
    </div>
  )
}

export default Signin
