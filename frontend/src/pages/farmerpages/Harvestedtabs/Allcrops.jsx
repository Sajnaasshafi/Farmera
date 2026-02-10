import React, {useState, useEffect} from 'react'
import { FaArrowAltCircleRight } from "react-icons/fa";
import { viewallharvestedcrops } from '../../../api/api';
import { Link } from 'react-router-dom';

const Allcrops = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await viewallharvestedcrops();
        setData(response);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchdata();
  }, []);


  return (
    <div className="flex flex-wrap gap-6">
      {data.map((item) => (
        <div
          key={item._id}
          className="w-[260px] bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100"
        >
          {/* Image */}
          <div className="relative h-44">
            <img
              src={item.cropimage || "/placeholder.jpg"}
              alt={item.cropname}
              className="w-full h-full object-cover"
            />
    
            <span className="absolute top-3 right-3 bg-white px-3 py-1 text-sm rounded-full shadow text-green-900 font-medium">
              <Link to={`/farmer/harvestedcrops/harvestedallcropdet/${item._id}`}>
              <FaArrowAltCircleRight size={25} className="text-green-950" />
              </Link>
            </span>
          </div>
    
          <div className="p-4 space-y-3">
            <h3 className="text-lg font-bold text-green-950">
              {item.cropname}
            </h3>
    
            <div className="flex justify-between text-sm text-green-900">
              <span>Available:</span>
              <span>{item.availableQuantity} kg</span>
            </div>
    
            <div className="flex justify-between text-sm text-green-900">
              <span>Price:</span>
              <span>₹{item.pricePerKg}/kg</span>
            </div>              
          </div>
        </div>
      ))}
    
      {data.length === 0 && (
        <p className="text-green-900 font-medium">
          No crops added yet 🌾
        </p>
      )}
    </div>
    
      );
    };

export default Allcrops