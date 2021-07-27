import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 10000,
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
  },
});

request.interceptors.response.use((response) => response.data);
export default request;
