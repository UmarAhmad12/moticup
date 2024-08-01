import { configureStore } from "@reduxjs/toolkit";

import courseSlice from "./slices/assetsSlice";
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    courses: courseSlice,
    // razorpay: razorPaySliceReducer,
    // lecture: lectureSliceReducer,
    // stat: StatSliceReducer,
  },
  devTools: true,
});

export default store;
