import React, {useState, useEffect} from 'react'
import { Link, useParams} from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { Eye } from "lucide-react"
import Sidebar from '../../components/farmercomponets.jsx/Sidebar'
import Harvestedheader from '../../components/farmercomponets.jsx/Harvestedheader'
import { getharvestedcropdetails } from '../../api/api';

const Harvestedallcropdet = () => {
  const { id } = useParams();
    const [crop, setcrop] = useState(null);

    useEffect(() => {
        const fetchcrop = async () => {
          try {
            const data = await getharvestedcropdetails(id);
            setcrop(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchcrop();
      }, [id]);
    
      if (!crop) return <p>Loading...</p>;
  return (
    <div className="w-screen h-screen flex bg-green-50">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-y-auto">

        <div className="sticky top-0 z-50 bg-white">
          <Harvestedheader />
        </div>

        <div className="p-6">
          <div className="rounded-lg p-6 shadow-sm min-h-[300px]">

            <div className='flex'>
            

            <h1 className="text-2xl font-bold text-green-900 mb-8 font-mono">
          {crop.cropname} |  
        </h1>

        <h1 className="text-2xl font-bold text-green-700 mb-8 ml-2 font-mono">
          {crop.variety} |  
        </h1>

        <h1 className="text-2xl font-bold text-green-500 mb-8 ml-2 font-mono">
          {crop.category}
        </h1>
        
        </div>

        <p className="text-sm text-amber-700 mt-2 font-mono">Created on: {new Date(crop.createdAt).toLocaleDateString()} </p>


        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10 mt-2">

          {/* LEFT SIDE */}
          <div className="lg:w-1/2">

            <img
            src={crop.cropimage}
              alt={crop.cropname}
              className="rounded-xl w-full h-64 object-cover mb-4"
            />

            {crop.farmerId && (
              <div className="mt-6 rounded-xl p-4 flex items-center gap-4">
                <img
                src={crop.farmerId.farmerimage}
                alt="farmer"
                className="w-16 h-16 rounded-full object-cover border-2 border-green-600"/>
                
                <div className="font-mono text-sm space-y-1">
                  <p className="text-green-900 font-bold text-base">{crop.farmerId.name}</p>
                  <p className="text-green-700">{crop.farmerId.farmName}</p>
                  <p className="text-amber-800">{crop.farmerId.farmLocation}</p>
                  <p className="text-gray-600 text-xs">{crop.farmerId.email}</p>
                </div>
              </div>
            )}
          </div>


          {/* RIGHT SIDE - CONTENT */}
          <div className="lg:w-1/2 text-gray-600 leading-relaxed text-lg space-y-4 font-mono">
            <p className='font-mono font-semibold text-xl text-green-900'>Harvest on: <span className='font-serif font-thin text-base text-amber-900'>{crop.harvestDate}</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Available Quantity: <span className='font-serif font-thin text-base text-amber-900'>{crop.availableQuantity}KG</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Min Order Quantity: <span className='font-serif font-thin text-base text-amber-900'>{crop.minOrderQuantity}KG</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Price per KG: <span className='font-serif font-thin text-base text-amber-900'>{crop.pricePerKg}KG</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Grade: <span className='font-serif font-thin text-base text-amber-900'>{crop.grade}</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Freshness Level: <span className='font-serif font-thin text-base text-amber-900'>{crop.freshnessLevel}</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Packaging Type: <span className='font-serif font-thin text-base text-amber-900'>{crop.packagingType}</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Delivery Available: <span className='font-serif font-thin text-base text-amber-900'>{crop.deliveryAvailable}</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Pickup Available: <span className='font-serif font-thin text-base text-amber-900'>{crop.pickupAvailable}</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Negotiable: <span className='font-serif font-thin text-base text-amber-900'>{crop.negotiable}</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>Status: <span className='font-serif font-thin text-base text-amber-900'>{crop.status}</span></p>
            <p className='font-mono font-semibold text-xl text-green-900'>isActive: <span className='font-serif font-thin text-base text-amber-900'>{crop.isActive}</span></p>
          </div>

          

        </div>


          </div>
        </div>
        
        
      </div>
    </div>
  )
}

export default Harvestedallcropdet
