import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cricketbuzz-backend.onrender.com/api',  // Update this with your backend server URL
});

export default instance;
