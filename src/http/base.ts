import axios from "axios";
import router from "../router";

const service = axios.create({
  withCredentials: false,
  timeout: 50000,
});

//请求拦截
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      localStorage.removeItem("token");
      router.push({ path: "/login" });
    }
    return response;
  },
  (error) => {
    if (error?.data?.code === 401) {
      localStorage.removeItem("token");
      router.push({ path: "/login" });
    }
    return Promise.reject(error);
  }
);

export default service;
