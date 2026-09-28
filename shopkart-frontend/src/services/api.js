import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true // CRITICAL: Sends JWT cookie for /wishlist and protected endpoints
});

export const customerAPI = {
  register: (data) => API.post('/customers/register', data),
  login: (data) => API.post('/customers/login', data),
  logout: () => API.post('/customers/logout'),
  getProfile: () => API.get('/customers/me')
};

export const productAPI = {
  getAll: (search = '', category = '', sort = '') => {
    let query = `/products?search=${encodeURIComponent(search)}`;
    if (category && category !== 'All') query += `&category=${encodeURIComponent(category)}`;
    if (sort) query += `&sort=${encodeURIComponent(sort)}`;
    return API.get(query);
  },
  getById: (id) => API.get(`/products/${id}`)
};

export const wishlistAPI = {
  add: (productId) => API.post(`/wishlist/${productId}`),
  get: () => API.get('/wishlist'),
  remove: (productId) => API.delete(`/wishlist/${productId}`)
};

export default API;