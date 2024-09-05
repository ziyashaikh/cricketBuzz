import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://your-vercel-api-url.vercel.app/api',
});

export default instance;
