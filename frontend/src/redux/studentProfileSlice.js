import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudentProfile = createAsyncThunk(
  "studentProfile/fetchStudentProfile",
  async () => {
    console.log("fetchStudentProfile");
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:7000/student/getStudent`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("studentProfile", response.data);
    return response.data;
  }
);



export const updateStudentProfile = createAsyncThunk(
    "studentProfile/updateStudentProfile",
    async (studentProfile) => {
        console.log("updateStudentProfile");
        const token = localStorage.getItem("token");
        const response = await axios.put(
        `http://localhost:7000/student/complete-profile`,
        studentProfile,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
        );
        console.log("studentProfile", response.data);
        return response.data;
    }
    );

const studentProfileSlice = createSlice({
  name: "studentProfile",
  initialState: {
    studentProfile: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentProfile = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStudentProfile.pending, (state) => {   
        state.status = "loading";
      })
      .addCase(updateStudentProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentProfile = action.payload;
      })
      .addCase(updateStudentProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentProfileSlice.reducer;
