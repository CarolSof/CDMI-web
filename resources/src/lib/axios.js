// resources/src/lib/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:8000", // backend Laravel
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // necesario si usas Sanctum
});

// 👉 Agrega automáticamente el token de auth si existe
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

//const token = localStorage.getItem("token");
//if (token) {
  //instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//}

export default instance;
