import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async(userCredentials, {rejectWithValue}) => {
    try {
      const request = await axios.post("http://localhost:3001/api/v1/user/login",userCredentials);
      const response = request.data;  
      sessionStorage.setItem("user", JSON.stringify(response.body));
      return response.body;
      } catch(error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(sessionStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;