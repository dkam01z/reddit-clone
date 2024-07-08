import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  userVotes: {},
  loading: false,
  error: null,
};

export const fetchUserVotes = createAsyncThunk('userVotes/fetchUserVotes', async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:5000/getUserVotes?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
}); 

export const updateUserVote = createAsyncThunk('userVotes/updateUserVote', async ({ postId, userId, voteType }, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/updateCounter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ postId, user_id: userId, newCount: voteType }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();
    return { postId, voteType };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const userVotesSlice = createSlice({
  name: 'userVotes',
  initialState,
  reducers: {
    resetUserVotes: (state) => {
      state.userVotes = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserVotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserVotes.fulfilled, (state, action) => {
        state.userVotes = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserVotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserVote.fulfilled, (state, action) => {
        const { postId, voteType } = action.payload;
        state.userVotes[postId] = voteType;
      });
  },
});


export const { resetUserVotes } = userVotesSlice.actions;


export default userVotesSlice.reducer;
