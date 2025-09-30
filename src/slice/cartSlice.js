import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartDetails")
    ? JSON.parse(localStorage.getItem("cartDetails"))
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartTotal: (state, action) => {
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }

      const findIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (findIndex >= 0) {
        state.cartItems[findIndex].cartQun =
          (state.cartItems[findIndex].cartQun || 1) + 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQun: 1 });
      }

      localStorage.setItem("cartDetails", JSON.stringify(state.cartItems));
    },

    cartQuantity: (state, action) => {
      const { id, type } = action.payload;

      const findIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );

      if (findIndex >= 0) {
        if (type === "increment") {
          state.cartItems[findIndex].cartQun =
            (state.cartItems[findIndex].cartQun || 1) + 1;
        } else if (type === "decrement" && state.cartItems[findIndex].cartQun > 1) {
          state.cartItems[findIndex].cartQun -= 1;
        }
      }

      localStorage.setItem("cartDetails", JSON.stringify(state.cartItems));
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartDetails", JSON.stringify(state.cartItems));
    },
  },
});

export const { cartTotal, cartQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
