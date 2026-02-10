import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { harvestedcroppost } from "../../../api/api";

const Addcrops = () => {


    let farmerid= localStorage.getItem("id")
    const navigate = useNavigate()
    const [data, setData] = useState({
  cropname: "",
  variety: "",
  category: "",
  harvestDate: "",
  availableQuantity: "",
  minOrderQuantity: "",
  pricePerKg: "",
  negotiable: false,
  grade: "",
  freshnessLevel: "",
  deliveryAvailable: false,
  pickupAvailable: false,
  packagingType: "",
  status: "harvested",
  isActive: true,
  cropimage: null
})

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  setData({
    ...data,
    [name]: files ? files[0] : value === "true"
      ? true
      : value === "false"
      ? false
      : value
  });
};


  const handleSubmit = async (e) => {
  e.preventDefault()

  const formData = new FormData();
  formData.append("cropname", data.cropname);
formData.append("variety", data.variety);
formData.append("category", data.category);
formData.append("harvestDate", data.harvestDate);
formData.append("availableQuantity", data.availableQuantity);
formData.append("minOrderQuantity", data.minOrderQuantity);
formData.append("pricePerKg", data.pricePerKg);
formData.append("negotiable", data.negotiable);
formData.append("grade", data.grade);
formData.append("freshnessLevel", data.freshnessLevel);
formData.append("deliveryAvailable", data.deliveryAvailable);
formData.append("pickupAvailable", data.pickupAvailable);
formData.append("packagingType", data.packagingType);
formData.append("status", data.status);
formData.append("isActive", data.isActive);

/* 🔥 IMAGE — must match Multer field name */
formData.append("cropimage", data.cropimage);
  try {
    const response = await harvestedcroppost(formData, farmerid)
    console.log("Success:", response.data)
    navigate("/farmer/harvestedcrops/my");
  } catch (error) {
    console.error("Error:", error)
  }
}
  


  return (
    <div className="min-h-[calc(100vh-8rem)] flex justify-center items-start pt-10">
      <form 
      onSubmit={handleSubmit}
      className="w-[90%] max-w-4xl rounded-2xl bg-gradient-to-b from-green-200/70 via-green-400/60 to-amber-900/30 border-2 border-dotted border-green-900/30 p-10 shadow-amber-950 shadow-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Crop Name
            </label>
            <input
              type="text"
              name="cropname"
              value={data.cropname}
              onChange={handleChange}
              placeholder="Enter your cropname"
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
           
            />
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Variety
            </label>
            <input
              type="text"
              name="variety"
              value={data.variety}
              onChange={handleChange}
              placeholder="Enter your crop variety"
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
           
            />
          </div>

          <div>
  <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
    Crop Image
  </label>

  <input
    type="file"
    name="cropimage"
    accept="image/*"
    onChange={(e) =>
    setData({ ...data, cropimage: e.target.files[0] })
  }
    className="
      w-full
      bg-green-50
      border-dotted border-4 border-green-900/30
      rounded-xl
      p-3
      text-sm
      font-mono
      text-green-950
      file:mr-4
      file:py-2
      file:px-4
      file:rounded-lg
      file:border-0
      file:bg-green-900
      file:text-gray-50
      hover:file:bg-amber-900
      focus:border-green-700
      outline-none
    "
   
  />
</div>


          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono text-green-950 focus:border-green-700 outline-none"
            >
              <option value="" disabled  className="text-amber-900">
                Select category
              </option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Spice">Spice</option>
              <option value="Pulse">Pulse</option>
            </select>
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Harvest Date
            </label>

            <input
              type="date"
              name="harvestDate"
              value={data.harvestDate}
              onChange={handleChange}
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
              font-mono text-green-950
              focus:border-green-700 
              outline-none"
             
            />
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Available Quantity
            </label>
            <input
              type="number"
              name="availableQuantity"
              value={data.availableQuantity}
              onChange={handleChange}
              placeholder="available quantity"
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
              
            />
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Minorder quantity
            </label>
            <input
              type="number"
              name="minOrderQuantity"
              value={data.minOrderQuantity}
              onChange={handleChange}
              placeholder="Min orderquantity"
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
             
            />
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              priceperkg
            </label>
            <input
              type="number"
              name="pricePerKg"
              value={data.pricePerKg}
              onChange={handleChange}
              placeholder="Price per kg"
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
              
            />
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Negotiable
            </label>
            <select
              name="negotiable"
              value={data.negotiable}
              onChange={handleChange}
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono text-green-950 focus:border-green-700 outline-none"
              >
              <option value="" disabled className="text-amber-900">
                Select 
              </option>
              <option value="true">true</option>
              <option value="false">False</option>
            </select>
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Grade
            </label>
            <select
              name="grade"
              value={data.grade}
              onChange={handleChange}
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono text-green-950 focus:border-green-700 outline-none"
              >
              <option value="" disabled className="text-amber-900">
                Select 
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Freshness Level
            </label>
            <select
              name="freshnessLevel"
              value={data.freshnessLevel}
              onChange={handleChange}
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono text-green-950 focus:border-green-700 outline-none"
              >
              <option value="" disabled className="text-amber-900">
                Select 
              </option>
              <option value="Fresh">Fresh</option>
              <option value="1-day old">1-day old</option>
              <option value="2-day old">2-day old</option>
            </select>
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Delivery Avalable
            </label>
            <select
              name="deliveryAvailable"
              value={data.deliveryAvailable}
              onChange={handleChange}
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono text-green-950 focus:border-green-700 outline-none"
              >
              <option value="" disabled className="text-amber-900">
                Select 
              </option>
              <option value="true">true</option>
              <option value="false">False</option>
            </select>
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Pickup Available
            </label>
            <select
              name="pickupAvailable"
              value={data.pickupAvailable}
              onChange={handleChange}
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono text-green-950 focus:border-green-700 outline-none"
              >
              <option value="" disabled className="text-amber-900">
                Select 
              </option>
              <option value="true">true</option>
              <option value="false">False</option>
            </select>
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Packaging Type
            </label>
            <select
              name="packagingType"
              value={data.packagingType}
              onChange={handleChange}
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono text-green-950 focus:border-green-700 outline-none"
             >
              <option value="" disabled className="text-amber-900">
                Select 
              </option>
              <option value="Bag">Bag</option>
              <option value="Box">Box</option>
              <option value="Loose">Loose</option>
            </select>
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              Status
            </label>
            <input
              type="text"
              name="status"
              value={data.status}
              onChange={handleChange}
              placeholder="status"
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono focus:border-green-700 outline-none"
             
            />
          </div>

          <div>
            <label className="block text-start mb-2 text-lg font-mono font-bold text-green-950">
              IsActive
            </label>
            <select
              name="isActive"
              value={data.isActive}
              onChange={handleChange}
              className="w-full bg-green-50 border-dotted border-4 border-green-900/30 rounded-xl p-3 text-sm 
                    placeholder-amber-900 font-mono text-green-950 focus:border-green-700 outline-none"
              >
              <option value="" disabled className="text-amber-900">
                Select 
              </option>
              <option value="true">true</option>
              <option value="false">False</option>
            </select>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="w-1/2 bg-green-900 hover:bg-amber-900 text-gray-50 font-bold py-3 rounded-lg transition duration-300">
                Add
            </button>

            <button
              type="button"
              className="w-1/2 bg-green-50 border-2 border-green-900 text-green-900 font-bold py-3 rounded-lg hover:bg-green-100 transition duration-300">
                Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Addcrops;
