import axios from "axios";

let URL = import.meta.env.VITE_APP_API_URL;

const apiResource = () => {
  const api = axios.create({
    baseURL: URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => Promise.resolve(response),
    (error) => {
      if (error?.response?.status === 403 || error?.response?.status === 401) {
        console.error("Unauthorized or Forbidden");
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = apiResource();
