import axios from "axios";

// Açar server tərəfində qalır, brauzerə çıxmır.
export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      localStorage.removeItem("token");
    }

    const message =
      error.response?.data?.message || "Gözlənilməz xəta baş verdi";
    return Promise.reject(new Error(message));
  },
);
