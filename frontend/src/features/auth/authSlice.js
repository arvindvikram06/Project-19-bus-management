import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";

const tokenFromStorage = localStorage.getItem("token");
const initialState = {
  token: tokenFromStorage || null,
  user: tokenFromStorage ? jwtDecode(tokenFromStorage).username : null,
  role: tokenFromStorage ? jwtDecode(tokenFromStorage).role : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      const decoded = jwtDecode(action.payload);
      state.user = decoded.username || decoded.studentId || decoded.facultyId; // Adjust per JWT payload
      state.role = decoded.role;
      localStorage.setItem("token", action.payload); // Store token in localStorage
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
