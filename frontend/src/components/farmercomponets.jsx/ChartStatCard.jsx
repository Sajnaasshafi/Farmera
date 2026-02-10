import React from "react";

const ChartStatCard = ({
  icon: Icon,
  title,
  value,
  status,
  statusColor,
  children,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
      <div className="flex justify-between items-center">
        <div className={`p-3 rounded-xl ${statusColor}`}>
          {Icon && <Icon size={20} className="text-white" />}
        </div>

        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {status}
        </span>
      </div>

      <h3 className="mt-3 text-gray-600">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>

      {/* Chart */}
      <div className="mt-2 h-[90px]">
        {children}
      </div>
    </div>
  );
};

export default ChartStatCard;
