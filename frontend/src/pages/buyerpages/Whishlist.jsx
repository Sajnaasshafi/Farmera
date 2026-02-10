import React from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/buyercomponent.jsx/Navbar";
import toast from "react-hot-toast";

import { removeFromWishlist } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  /* ---------- REDUX STATE ---------- */
  const wishlist = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  /* ---------- REMOVE FROM WISHLIST ---------- */
  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  /* ---------- ADD TO CART + REMOVE FROM WISHLIST ---------- */
  const handleAddToCart = (item) => {
    const alreadyInCart = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (alreadyInCart) {
      toast.error("Item already in cart");
      return;
    }

    // Add to cart
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        variety: item.variety,
        price: item.price,
      })
    );

    // Remove from wishlist
    dispatch(removeFromWishlist(item.id));

    toast.success("Moved to cart");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="w-full px-12 py-10">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-green-950 flex items-center gap-3 mb-8">
          <Heart className="w-7 h-7 text-green-900" />
          My Wishlist
          <span className="text-base text-gray-500 font-medium">
            ({wishlist.length} items)
          </span>
        </h1>

        {/* EMPTY STATE */}
        {wishlist.length === 0 && (
          <p className="text-gray-500 text-lg">
            Your wishlist is empty ❤️
          </p>
        )}

        {/* LIST */}
        <div className="space-y-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-6 flex justify-between items-center shadow-sm"
            >
              {/* LEFT */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image</span>
                </div>

                <div>
                  <h2 className="font-semibold text-lg text-green-950">
                    {item.name}
                  </h2>

                  {item.farm && (
                    <p className="text-sm text-gray-600">
                      From: {item.farm}
                    </p>
                  )}

                  <p className="mt-1 font-medium text-green-900">
                    ₹{item.price}{" "}
                    {item.unit && (
                      <span className="text-gray-500 text-sm">
                        per {item.unit}
                      </span>
                    )}
                  </p>

                  {item.expectedDate && (
                    <p className="text-sm text-orange-600 mt-1">
                      Available:{" "}
                      {new Date(item.harvestDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex items-center gap-2 bg-green-900 hover:bg-green-800 text-white px-5 py-2 rounded-lg font-medium transition"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center gap-2 border border-gray-300 text-red-500 hover:bg-red-50 px-5 py-2 rounded-lg font-medium transition"
                >
                  <Trash2 size={18} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
