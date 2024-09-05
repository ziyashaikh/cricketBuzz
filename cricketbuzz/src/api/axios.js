import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cricket-buzz-server.vercel.app/api',
});

export default instance;
