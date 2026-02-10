import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /* ---------------- ADD TO CART ---------------- */
    addToCart: (state, action) => {
  console.log("REDUX RECEIVED:", action.payload);

  const item = state.items.find(i => i.id === action.payload.id);
  if (item) {
    item.quantity += 1;
  } else {
    state.items.push({ ...action.payload, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(state.items));
},

    /* ---------------- INCREMENT QTY ---------------- */
    incrementQty: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );

      if (item && item.productType !== "FutureHarvest") {
        item.quantity += 1;
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    /* ---------------- DECREMENT QTY ---------------- */
    decrementQty: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );

      if (
        item &&
        item.productType !== "FutureHarvest" &&
        item.quantity > 1
      ) {
        item.quantity -= 1;
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    /* ---------------- REMOVE ITEM ---------------- */
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.id !== action.payload
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items)
      );
    },

    /* ---------------- CLEAR CART ---------------- */
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
