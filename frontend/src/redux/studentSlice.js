import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch students action
export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:7000/admin/getStudents", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("students",response.data)
    return response.data; 
  }
);


const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload; 
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
