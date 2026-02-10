import { NavLink } from "react-router-dom"

const Shoptabs = () => {
  const tabStyle = ({ isActive }) =>
    `pb-2 font-semibold transition ${
      isActive
        ? "border-b-2 border-green-700 text-green-700"
        : "text-gray-500 hover:text-green-700"
    }`

  return (
    <div className="flex gap-8 border-b font-mono">

      <NavLink to="harvested" className={tabStyle}>
        Book for Harvested Crop
      </NavLink>

      <NavLink to="Futureharvest" className={tabStyle}>
        Pre-book for Future Harvest
      </NavLink>

    </div>
  )
}

export default Shoptabs
