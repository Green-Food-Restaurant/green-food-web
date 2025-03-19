import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8090/api'
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const cartService = {
  getCart: async (cartId: string) => {
    const response = await api.get(`/carrinho/${cartId}`);
    return response.data;
  },
  
  getCheckoutInfo: async (cartId: string) => {
    const response = await api.get(`/carrinho/${cartId}/checkout/info`);
    return response.data;
  },

  addItem: async (cartId: string, item: any) => {
    const response = await api.post(`/carrinho/${cartId}/items`, item);
    return response.data;
  }
};

export default api;