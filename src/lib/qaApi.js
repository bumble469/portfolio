import axios from 'axios';

const qaApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_QA_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default qaApi;
