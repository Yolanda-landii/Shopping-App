import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User operations
export const addUser = (user) => api.post('/users', user);
export const fetchUsers = () => api.get('/users');
export const updateUser = (id, user) => api.patch(`/users/${id}`, user);

// Shopping list operations
export const fetchShoppingLists = () => api.get('/shoppingLists');
export const addShoppingList = (shoppingList) => api.post('/shoppingLists', shoppingList);
export const updateShoppingList = (id, shoppingList) => api.patch(`/shoppingLists/${id}`, shoppingList);
export const deleteShoppingList = (id) => api.delete(`/shoppingLists/${id}`);
