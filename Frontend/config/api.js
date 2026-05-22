// Auto-switch between local and production
const isDev = window.location.hostname === 'localhost';

export const BASE_URL = isDev 
  ? 'http://localhost:5000'
  : 'https://rentride-fyp.onrender.com';

export const API_URL = `${BASE_URL}/api`;

export default API_URL;