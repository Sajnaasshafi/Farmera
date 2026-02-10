import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Truck,
  ShieldCheck,
  Clock,
} from "lucide-react";
import Navbar from "../../components/buyercomponent.jsx/Navbar";

const Home = () => {
  const navigate = useNavigate()

  const goToHarvested = () => {
    navigate("/buyer/shop/harvested"); // 👈 navigates to harvested page
  };

  const goTopreharvest = () => {
    navigate("/buyer/shop/futureharvest"); // 👈 navigates to harvested page
  };


  return (
    <div className="w-full text-gray-800">

      <Navbar />

      {/* HERO */}
      <section className="w-full bg-green-50 py-24">
        <div className="px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* TEXT */}
          <div>
            <h1 className="text-5xl font-extrabold text-green-950 leading-tight">
              Fresh From The Farm,
              <br />
              <span className="text-green-800">
                Straight To Your Table
              </span>
            </h1>

            <p className="mt-6 text-lg text-green-800 max-w-xl">
              Connect directly with local farmers. Buy fresh harvested crops or
              pre-book future harvests at the best prices.
            </p>

            <div className="mt-8 flex gap-4">
              <button 
              onClick={goToHarvested}
              className="bg-green-900 text-white px-7 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-800">
                Shop Now <ArrowRight size={18} />
              </button>

              <button 
              onClick={goTopreharvest}
              className="border border-green-900 text-green-900 px-7 py-3 rounded-lg font-semibold hover:bg-green-100">
                Pre-book Harvest
              </button>
            </div>
          </div>

          {/* GRAPHIC */}
          <div className="relative flex justify-center">
            <div className="absolute w-80 h-80 bg-green-200 rounded-full -left-10 top-10 opacity-60" />
            <div className="absolute w-80 h-80 bg-green-300 rounded-full right-0 bottom-0 opacity-40" />
            <div className="relative w-64 h-64 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="w-24 h-24 text-green-800" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="w-full bg-white py-24">
        <h2 className="text-3xl font-bold text-center text-green-950 mb-16">
          Why Choose Farmera?
        </h2>

        <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Leaf />}
            title="Fresh from Farm"
            text="Get fresh produce directly from local farmers."
          />
          <FeatureCard
            icon={<Truck />}
            title="Fast Delivery"
            text="Quick and reliable delivery within 24–48 hours."
          />
          <FeatureCard
            icon={<ShieldCheck />}
            title="Quality Assured"
            text="Every product is quality checked."
          />
          <FeatureCard
            icon={<Clock />}
            title="Pre-book Harvest"
            text="Book crops before harvest at best prices."
          />
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
<section className="w-full bg-white py-24">
  <div className="px-8">

    <div className="flex justify-between items-center mb-12">
      <h2 className="text-3xl font-bold text-green-950 ml-1">
        Shop by Category
      </h2>
      <button className="text-green-800 font-semibold flex items-center gap-2">
        View All <ArrowRight size={16} />
      </button>
    </div>

    {/* 🔥 5 COLUMN GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

      <CategoryCard
        title="Vegetables"
        count="45 products"
        bg="bg-green-100"
      />

      <CategoryCard
        title="Fruits"
        count="32 products"
        bg="bg-orange-100"
      />

      <CategoryCard
        title="Grains"
        count="28 products"
        bg="bg-yellow-100"
      />

      <CategoryCard
        title="Pulses"
        count="20 products"
        bg="bg-lime-100"
      />

      {/* ✅ NEW CATEGORY */}
      <CategoryCard
        title="Spices"
        count="18 products"
        bg="bg-red-100"
      />

    </div>
  </div>
</section>


      {/* CTA */}
      <section className="w-full bg-green-900 py-24 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Get Fresh Produce?
        </h2>
        <p className="mb-10 text-green-100">
          Join thousands of happy customers who buy directly from farmers.
        </p>
        <button 
        onClick={goToHarvested}
        className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-100">
          Start Shopping →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-green-800">
        © 2026 Farmera. All rights reserved.
      </footer>

    </div>
  );
};

/* COMPONENTS */

const FeatureCard = ({ icon, title, text }) => (
  <div className="border border-green-100 rounded-xl p-8 text-center hover:shadow-md transition">
    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-green-800">
      {icon}
    </div>
    <h3 className="font-semibold text-green-950 text-lg mb-2">
      {title}
    </h3>
    <p className="text-green-700 text-sm">
      {text}
    </p>
  </div>
);

const CategoryCard = ({ title, count, bg }) => (
  <div className="border border-green-100 rounded-xl p-6 hover:shadow-md transition cursor-pointer">
    <div className={`w-16 h-16 rounded-xl ${bg} flex items-center justify-center mb-4`}>
      <Leaf className="w-7 h-7 text-green-800" />
    </div>
    <h3 className="font-semibold text-green-950 text-lg">
      {title}
    </h3>
    <p className="text-green-700 text-sm mt-1">
      {count}
    </p>
  </div>
);

export default Home;
