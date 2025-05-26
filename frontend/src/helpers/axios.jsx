// src/utils/axios.js
import axios from "axios";
import CryptoJS from "crypto-js";

const secretKey = "ITEG@123";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto-attach decrypted token to requests
instance.interceptors.request.use((config) => {
  const encryptedToken = localStorage.getItem("token");
  if (encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const token = bytes.toString(CryptoJS.enc.Utf8);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
