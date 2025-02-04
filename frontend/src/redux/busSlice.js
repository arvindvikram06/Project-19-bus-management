import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunks
export const fetchBuses = createAsyncThunk("bus/fetchBuses", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:7000/buses", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("buses", response.data);
  return response.data;
});

export const createBus = createAsyncThunk("bus/addBus", async (bus) => {
  const token = localStorage.getItem("token");
  const response = await axios.post("http://localhost:7000/admin/buses", bus, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const updateBus = createAsyncThunk("bus/editBus", async (bus) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `http://localhost:7000/admin/buses/${bus.busId}`,
    bus,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
});

export const deleteBus = createAsyncThunk("bus/deleteBus", async (busId) => {
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:7000/admin/buses/${busId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return busId;
});

export const bookBus = createAsyncThunk("bus/bookBus", async (bus) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`http://localhost:7000/student/bookseat`, {busNumber:bus}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const allocateFaculty = createAsyncThunk(
  "bus/allocateFaculty",
  async ({ busId, facultyId }) => {
    const token = localStorage.getItem("token");
    const body = {
      busId: busId,
      facultyId: facultyId,
    };
    console.log(body);
    const response = await axios.post(
      `http://localhost:7000/admin/allocateFaculty`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

// Slice
const busSlice = createSlice({
  name: "bus",
  initialState: {
    buses: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Buses
      .addCase(fetchBuses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.buses = action.payload;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Create Bus
      .addCase(createBus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.buses.push(action.payload); // Add the newly created bus to the list
      })
      .addCase(createBus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update Bus
      .addCase(updateBus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedBus = action.payload;
        state.buses = state.buses.map((bus) =>
          bus.busId === updatedBus.busId ? updatedBus : bus
        );
      })
      .addCase(updateBus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete Bus
      .addCase(deleteBus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.buses = state.buses.filter((bus) => bus.busId !== action.payload); // Remove the deleted bus
      })
      .addCase(deleteBus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Book Bus
      .addCase(bookBus.fulfilled, (state, action) => {
        const updatedBus = action.payload;
        state.buses = state.buses.map((bus) =>
          bus.busId === updatedBus.busId ? updatedBus : bus
        );
      });
  },
});

export default busSlice.reducer;
