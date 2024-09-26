import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async ({token, userName}) => {
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', 
        { userName},
        {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: false,
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
        state.loading = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;