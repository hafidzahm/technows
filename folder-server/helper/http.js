const axios = require('axios');
//NEWS API
const http = axios.create({
    baseURL: process.env.NEWS_BASE_URL,
  });

module.exports = http;
