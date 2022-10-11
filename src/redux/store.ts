import { configureStore } from "@reduxjs/toolkit";
import cartItem from "../pages/Catalog/Catalog.slice";

export const store = configureStore({
  reducer: { cartItem },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
