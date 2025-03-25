import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    lists: [],
  },
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    updateList: (state, action) => {
      const { id, updatedList } = action.payload;
      const index = state.lists.findIndex(list => list.id === id);
      if (index !== -1) {
        state.lists[index] = { ...state.lists[index], ...updatedList };
      }
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    addItem: (state, action) => {
      const { listId, item } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.items.push(item);
      }
    },
    updateItem: (state, action) => {
      const { listId, itemId, updatedItem } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        const item = list.items.find(item => item.id === itemId);
        if (item) {
          Object.assign(item, updatedItem);
        }
      }
    },
    deleteItem: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.items = list.items.filter(item => item.id !== itemId);
      }
    },
  },
});

export const { setLists, addList, updateList, deleteList, addItem, updateItem, deleteItem } = shoppingListSlice.actions;
export default shoppingListSlice;
