import React from 'react'

const StatCard = ({ icon, label, value, badge, brown }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4">
      <div
        className={`relative p-4 rounded-xl text-white ${
          brown ? "bg-[#8a6f4d]" : "bg-[#2f6f55]"
        }`}
      >
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
            2
          </span>
        )}
      </div>

      <div>
        <p className="text-sm text-[#5f7f6b]">{label}</p>
        <p className="text-2xl font-semibold text-[#0f2f1f]">{value}</p>
      </div>
    </div>
  );
};

export default StatCard
