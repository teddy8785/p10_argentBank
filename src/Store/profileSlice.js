import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (token , {rejectWithValue}) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Erreur !")
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload || "erreur dans le chargement du profil";
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;
