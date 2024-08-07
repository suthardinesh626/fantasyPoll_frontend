import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = 'https://pollbackend-production-ec35.up.railway.app/api/v1/poll';
// const API = 'http://localhost:8000/api/v1/poll';

// Helper function to get the token
const getToken = () => localStorage.getItem('accessToken');

// Create Poll
const createPoll = createAsyncThunk(
  'poll/createPoll',
  async ({ title, summary, options }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user.user._id : null;

      if (!userId) {
        throw new Error("User not found in local storage");
      }

      const response = await axios.post(`${API}/createpoll`, { title, summary, options, userId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Create Poll Error:", error.response ? error.response.data : error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Fetch All Polls
const fetchPolls = createAsyncThunk(
  'poll/fetchPolls',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${API}/allpoll`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Vote Poll
const votePoll = createAsyncThunk(
  'poll/votePoll',
  async ({ pollId, optionId }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user.user._id : null;

      if (!userId) {
        throw new Error("User not found in local storage");
      }

      const response = await axios.put(`${API}/${pollId}/options/${optionId}/vote`, { userId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch User Polls
const fetchUserPolls = createAsyncThunk(
  'poll/fetchUserPolls',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user.user._id : null;

      if (!userId) {
        throw new Error("User not found in local storage");
      }

      const response = await axios.get(`${API}/user/${userId}/polls`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const pollSlice = createSlice({
  name: "poll",
  initialState: {
    polls: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPoll.fulfilled, (state, action) => {
        state.loading = false;
        state.polls.push(action.payload);
        state.error = null;
      })
      .addCase(createPoll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(fetchPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchPolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(votePoll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(votePoll.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPoll = action.payload;
        const index = state.polls.findIndex(poll => poll._id === updatedPoll._id);
        if (index !== -1) {
          state.polls[index] = updatedPoll;
        }
        state.error = null;
      })
      .addCase(votePoll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      })
      .addCase(fetchUserPolls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.polls = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchUserPolls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.error.message;
      });
  }
});

export const pollReducer = pollSlice.reducer;
export { createPoll, fetchPolls, votePoll, fetchUserPolls };
