import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mode: "light",
  userId: "656aa3069cd7f84162fab176",
  // userId: null,
  user: null,
};

// Async thunk to fetch user data based on userId
export const fetchUserById = createAsyncThunk(
  "global/fetchUserById",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/authSlice/${userId}`); // Replace with your API endpoint
      return response.data; // Assuming the API returns user data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setMode, setLogin, setLogout } = globalSlice.actions;

// Async action creator to dispatch the fetchUserById thunk
export const fetchUser = () => async (dispatch) => {
  try {
    // Fetch the user ID from the server using your backend API
    const response = await axios.get("/api/index.js"); // Replace with your actual API endpoint
    const userId = response.data._id; // Assuming the user ID is stored in the "_id" field

    // Dispatch the thunk with the obtained userId
    const user = await dispatch(fetchUserById(userId));

    // Handle user data as needed
    console.log("User data:", user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export default globalSlice.reducer;
