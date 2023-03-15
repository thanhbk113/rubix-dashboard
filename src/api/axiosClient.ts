import axios from "axios";

const API_URL = "http://192.168.1.12:3000";

axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(
  function (config) {
    if (config.headers) {
      config.headers["Accept-Language"] = "en"; // vn - en
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
