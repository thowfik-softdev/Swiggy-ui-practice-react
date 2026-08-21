import { createSlice } from "@reduxjs/toolkit";
import { CDN_URL } from "../constants";

/**
 * Turn a raw Swiggy menu node into the shape the cart actually needs.
 *
 * We deliberately do NOT put `item.card.info` straight into the store:
 *  - it is deeply nested and carries a lot of fields the cart never reads
 *  - prices arrive in paise (14900 means Rs 149), so they are converted once
 *    here rather than in every component that renders a cart row
 *  - the image is resolved to a full URL once, for the same reason
 *
 * The result is a flat, plain, serialisable object - which is exactly what
 * Redux state is supposed to hold.
 */
export const toCartItem = (info, restaurantName) => ({
  id: info.id,
  name: info.name,
  price: Math.round((info.defaultPrice ?? info.price ?? 0) / 100),
  image: info.imageId ? `${CDN_URL}${info.imageId}` : null,
  isVeg: info.isVeg === 1,
  unit: info.itemAttribute?.portionSize ?? info.category ?? "",
  restaurant: restaurantName ?? "",
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    /**
     * payload: a cart item object from toCartItem().
     *
     * Adding the same dish twice does NOT push a duplicate row - it bumps the
     * quantity on the row that is already there. That is why the cart can
     * show "2 x Margherita" instead of two identical lines.
     */
    addItem: (state, action) => {
      const dish = action.payload;
      const line = state.items.find((item) => item.id === dish.id);

      if (line) {
        line.quantity += 1;
      } else {
        state.items.push({ ...dish, quantity: 1 });
      }
    },

    /**
     * payload: an id.
     *
     * Removing only ever needs the key, never the whole object - so this
     * action takes a string while addItem takes an object. Takes one off the
     * quantity, and drops the row entirely when it would hit zero.
     */
    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);

      // findIndex returns -1 when there is no match, and splice(-1, 1) would
      // delete the LAST row. Guard, or a stray dispatch eats the wrong dish.
      if (index === -1) return;

      if (state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
      } else {
        state.items.splice(index, 1);
      }
    },

    /**
     * payload: an id. Drops the whole line whatever its quantity - the bin
     * icon on the cart page, as opposed to the minus button.
     */
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    /**
     * Empties the cart. `length = 0` mutates the draft, which is what Immer
     * watches - `state.items = []` would work just as well.
     */
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
