// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://statusup-347c42d4df93.herokuapp.com',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
