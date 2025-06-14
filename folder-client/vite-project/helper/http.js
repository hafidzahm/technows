import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 6000,
});

export default http;
