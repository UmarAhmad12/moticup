import axios from "axios";

const BASE_URL = "http://asset-api.mindsharpner.com/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
