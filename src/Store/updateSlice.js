import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateUserProfile = createAsyncThunk(
  "profile/updateUserProfile",
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default profileSlice.reducer;
