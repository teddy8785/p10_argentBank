import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import profileReducer from './profileSlice';

// création du store
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;