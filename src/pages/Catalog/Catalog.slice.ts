import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../redux";
import { IItemInfo } from "../../types/IItemInfo";

const initialState: IItemInfo[] = [];
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<number>) => {
      const payload = action.payload;
      const previousInstanceIndex = state.findIndex(
        (item: IItemInfo) => item.id === payload
      );

      if (previousInstanceIndex !== -1) {
        const previousInstance = state[previousInstanceIndex];
        state[previousInstanceIndex] = {
          ...previousInstance,
          quantity: previousInstance.quantity + 1,
        };
      } else {
        state.push({ id: payload, quantity: 1 });
      }

      return state;
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const payload = action.payload;
      const previousInstanceIndex = state.findIndex(
        (item: IItemInfo) => item.id === payload
      );
      const previousInstance = state[previousInstanceIndex];

      if (previousInstance.quantity > 1) {
        state[previousInstanceIndex] = {
          ...previousInstance,
          quantity: previousInstance.quantity - 1,
        };
      } else {
        state = state.filter((item) => item.id !== payload);
      }

      return state;
    },
  },
});

export const getCartItemIds = (state: RootState) => state.cartItem;
export const { addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
