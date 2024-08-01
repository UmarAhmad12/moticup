import http from "./httpService";
import config from "./config.json";
import toast from "react-hot-toast";
// import { isArray } from "chart.js/dist/helpers/helpers.core";
// import jwtDecode from "jwt-decode";
// import { jwtDecode } from "jwt-decode";

const apiEndpoint = config.apiEndpoint;
const tokenKey = "mindsharpner_auth_token";

http.setJwt(getJWT());

export async function login(form) {
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(form),
  };

  try {
    const { data: resp } = await http.post(apiEndpoint + "login", form, config);
    const token_array = resp.data;
    console.log("Login Console", token_array);
    if (token_array[0].access_token) {
      const jwt = token_array[0].access_token;
      localStorage.setItem(tokenKey, jwt);
      toast.success("Login successful!");
    }
  } catch (ex) {
    toast.error("Login failed. Please check your credentials.");
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
  toast.success("You have been logged out.");
}

export function getJWT() {
  const jwtToken = localStorage.getItem(tokenKey);
  return jwtToken;
}
