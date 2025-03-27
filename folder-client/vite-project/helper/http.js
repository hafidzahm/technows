import axios from "axios";

const http = axios.create({
    baseURL: 'https://ch01.hafizh.web.id',
    timeout: 6000,
  });

export default http;