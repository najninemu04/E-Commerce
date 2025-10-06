import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/CartSlice";
// import cartReducer from "./slice/CartSlice";

const Store = configureStore({
  reducer: {
    cartDetails: cartSlice,
  },
});

export default Store;

