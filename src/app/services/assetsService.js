import http from "./httpService";
import config from "./config.json";
import { toast } from "react-hot-toast";

const apiEndpoint = config.apiEndpoint;

const tokenKey = "mindsharpner_auth_token";

http.setJwt(getJWT());

export async function getAssets() {
  const promise = http.get(apiEndpoint + "assets");

  toast.promise(promise, {
    pending: "Fetching assets...",
    success: "Assets fetched successfully!",
    error: "Failed to fetch assets.",
  });

  try {
    return await promise;
  } catch (error) {
    throw error;
  }
}

export async function createAssets(data) {
  return http.post(apiEndpoint + "assets", data);

  toast.promise(promise, {
    pending: "Creating asset...",
    success: "Asset created successfully!",
    error: "Failed to create asset.",
  });

  try {
    return await promise;
  } catch (error) {
    throw error;
  }
}

export async function updateAssets(data, id) {
  // const promise = http.put(apiEndpoint + "assets/" + id, data);
  const promise = http.put(apiEndpoint + `assets/${id}`, data);

  toast.promise(promise, {
    pending: "Updating asset...",
    success: "Asset updated successfully!",
    error: "Failed to update asset.",
  });

  try {
    return await promise;
  } catch (error) {
    throw error;
  }
}

export function getJWT() {
  const jwtToken = localStorage.getItem(tokenKey);
  return jwtToken;
}
