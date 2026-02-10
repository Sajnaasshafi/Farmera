import { NavLink } from "react-router-dom"

const Harvestedtab = () => {
  const tabStyle = ({ isActive }) =>
    `pb-2 font-semibold transition ${
      isActive
        ? "border-b-2 border-green-700 text-green-700"
        : "text-gray-500 hover:text-green-700"
    }`

  return (
    <div className="flex gap-8 border-b font-mono">
      <NavLink to="all" className={tabStyle}>
        All Crops
      </NavLink>

      <NavLink to="my" className={tabStyle}>
        My Crops
      </NavLink>

      <NavLink to="add" className={tabStyle}>
        Add Crop
      </NavLink>
    </div>
  )
}

export default Harvestedtab
