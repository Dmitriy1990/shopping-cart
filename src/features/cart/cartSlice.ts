import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { checkout } from "../../app/api";
import type { RootState } from "../../app/store";

type CheckoutState = "LOADING" | "READY" | "ERROR";

interface CartItems {
  [productID: string]: number;
}

export interface CartState {
  items: CartItems;
  checkoutState: CheckoutState;
  errorMessage: string;
}

const initialState: CartState = {
  items: {},
  checkoutState: "READY",
  errorMessage: "",
};

export const checkoutCart = createAsyncThunk<
  { success: boolean },
  void,
  { state: RootState }
>("cart/checkout", async (_, thunkAPI) => {
  const items = thunkAPI.getState().cart.items;
  const response = await checkout(items);
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      delete state.items[action.payload];
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.checkoutState = "LOADING";
        state.errorMessage = "";
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.checkoutState = "READY";
          state.items = {};
        } else {
          state.checkoutState = "ERROR";
        }
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.checkoutState = "ERROR";
        state.errorMessage = action.error.message || "Unknown error";
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export function getNumItems(state: RootState): number {
  return Object.values(state.cart.items).reduce((sum, qty) => sum + qty, 0);
}

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items,
  (items) => Object.values(items).reduce((sum, qty) => sum + qty, 0)
);

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.products.products,
  (items, products) => {
    let total = 0;
    for (const id in items) {
      const product = products[id];
      if (product) {
        total += product.price * items[id];
      }
    }
    return total.toFixed(2);
  }
);
