import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFaculty = createAsyncThunk(
  "faculty/fetchFaculty",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:7000/admin/getFaculty", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

const facultySlice = createSlice({
  name: "faculty",
  initialState: {
    faculty: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaculty.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFaculty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.faculty = action.payload;
      })
      .addCase(fetchFaculty.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default facultySlice.reducer;
