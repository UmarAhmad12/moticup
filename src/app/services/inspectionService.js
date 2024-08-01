import http from "./httpService";
import config from "./config.json";
import { toast } from "react-hot-toast";

const apiEndpoint = config.apiEndpoint;

const tokenKey = "mindsharpner_auth_token";


http.setJwt(getJWT());

export async function getInspection() {
  const promise = http.get(apiEndpoint + "inspections");

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

export async function createInspection(data) {
  const promise = http.post(apiEndpoint + "inspections", data);

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

export function getJWT() {
  const jwtToken = localStorage.getItem(tokenKey);
  return jwtToken;
}
