import axiosInstance from "@/app/helpers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") !== undefined
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

// Login
export const login = createAsyncThunk("/auth/login", async (loginData) => {
  try {
    const data = JSON.stringify(loginData);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = axiosInstance.request(config);
    toast.promise(res, {
      loading: "Wait! Authentication in progress...",
      success: (response) => response?.data?.message,
      error: "Failed to log in",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "An error occurred");
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role || ""); // Handle undefined role
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role || "";
    });
  },
});

export default authSlice.reducer;
