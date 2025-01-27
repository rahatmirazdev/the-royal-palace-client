import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://theroyalpalace.vercel.app',
});

export default axiosInstance;