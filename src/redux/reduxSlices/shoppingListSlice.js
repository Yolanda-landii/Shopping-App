import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { setItems, addItem, removeItem } = shoppingListSlice.actions;
export default shoppingListSlice;
