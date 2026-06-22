import axios from "axios";
import { useUserStore } from "../stores/useUserStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );
        return api(originalRequest);
      } catch (err) {
        useUserStore.getState().clearUser();
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
