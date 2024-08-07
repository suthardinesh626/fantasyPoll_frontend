import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API endpoint for user operations
const API = 'https://pollbackend-production-ec35.up.railway.app/api/v1/users';
// const API = 'http://localhost:8000/api/v1/users';

// Helper function to get the token
const getToken = () => localStorage.getItem('accessToken');

// Login user
const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/login`, userCredentials);
      const userData = response.data.data;
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('accessToken', userData.accessToken);
      localStorage.setItem('refreshToken', userData.refreshToken);
      return userData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Logout user
const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    return { isAuthenticated: false };
  }
);

// Register user
const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/register`, userDetails, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const userData = response.data.data;
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get user details from local storage
const userDetails = createAsyncThunk(
  'user/userDetails',
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        throw new Error("User not found in local storage");
      }
      // console.log(`User: ${JSON.stringify(user.user)}`)
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Logout failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(userDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      });
  }
});

export const userReducer = userSlice.reducer;
export { loginUser, logoutUser, registerUser, userDetails };
