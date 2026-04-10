import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

// Request Interceptor - Attach Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Response Interceptor - Handle Errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
// ===== AUTH APIs =====
export const authAPI = {
  login: (email, password) => API.post("/auth/login", { email, password }),
  signup: (email, password, confirmPassword) => 
    API.post("/auth/signup", { email, password, confirmPassword })
};
// ===== STUDENT APIs =====
export const studentAPI = {
  getAll: () => API.get("/students"),
  search: (query) => API.get("/students/search", { params: { query } }),
  add: (data) => API.post("/students", data),
  update: (id, data) => API.put(`/students/${id}`, data),
  delete: (id) => API.delete(`/students/${id}`)
};
// ===== TASK APIs =====
export const taskAPI = {
  getAll: () => API.get("/tasks"),
  add: (data) => API.post("/tasks", data),
  update: (id, data) => API.put(`/tasks/${id}`, data),
  delete: (id) => API.delete(`/tasks/${id}`)
};
export const AuthAPI = {
  login: (data) => API.post("/auth/login", data),
  signup: (data) => API.post("/auth/signup", data),
  getProfile: () => API.get("/auth/profile"),
};
export const UserAPI = {
  getUsers: () => API.get("/users"),
};
// Optional: set token manually (if needed)
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.Authorization;
  }
};