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
    loading: false,
    error: null,
    status: "idle",
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
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default profileSlice.reducer;
