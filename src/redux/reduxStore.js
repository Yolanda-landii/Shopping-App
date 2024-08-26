import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reduxSlices/authSlice';
import shoppingListReducer from './reduxSlices/shoppingListSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingList: shoppingListReducer.reducer,
  },
});

export default store;
