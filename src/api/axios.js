import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://gonggu-market.shop/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export default instance;
