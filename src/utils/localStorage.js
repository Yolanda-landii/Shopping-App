import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const addUser = (user) => api.post('/users', user);
export const fetchUsers = () => api.get('/users');
export const updateUser = (id, user) => api.patch(`/users/${id}`, user);