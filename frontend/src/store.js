import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import busReducer from "./redux/busSlice";
import facultyReducer from "./redux/facultySlice";
import studentReducer from "./redux/studentSlice";
import studentProfileReducer from "./redux/studentProfileSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    bus: busReducer,
    faculty: facultyReducer,
    student: studentReducer,
    studentProfile: studentProfileReducer,
  },
});
