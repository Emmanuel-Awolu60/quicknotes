import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Token helpers
export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

// Attach token
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// VERY IMPORTANT ✔️
export default API;
