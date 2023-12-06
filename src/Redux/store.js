import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import courseSlice from "./reducers/courseSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    courses: courseSlice,
  },
});

export const server = "https://backend-for-elearning-sable.vercel.app/api/v1";
// export const server = "http://localhost:5000/api/v1";

export default store;
