import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getItem = async (key) => {
  return await SecureStore.getItemAsync(key);
};

const removeItem = async (key) => {
  return await SecureStore.deleteItemAsync(key);
};

const axiosIns = axios.create({
  baseURL: "https://muzenetworktest.azurewebsites.net",
});

axiosIns.interceptors.request.use(async (config) => {
  // Retrieve token from SecureStore
  const token = await getItem("accessToken");
  // If token is found
  if (token) {
    // Set authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return modified config
  return config;
});

axiosIns.interceptors.response.use(
  (response) => {
    // If the response is successful (status code 2xx), return it as-is
    return response;
  },
  async (error) => {
    // If the response has a 401 status code, handle the unauthorized request
    if (error.response && error.response.status === 401) {
      await removeItem("accessToken");
    }

    // For other errors, reject the promise and pass the error along
    return Promise.reject(error);
  }
);

export default axiosIns;
