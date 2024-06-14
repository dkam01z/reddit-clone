import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    subreddits: [],
    loading: false,
    error: "",
};


export const fetchSubreddits = createAsyncThunk(
    'subreddit/fetchSubreddits',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5000/getSubreddits', {
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

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const createSubreddit = createAsyncThunk(
    'subreddit/createSubreddit',
    async (newSubreddit, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:5000/createSubreddit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSubreddit),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const subredditSlice = createSlice({
    name: 'subreddit',
    initialState,
    reducers: {
        resetSubredditState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubreddits.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubreddits.fulfilled, (state, action) => {
                state.subreddits = action.payload;
                state.loading = false;
            })
            .addCase(fetchSubreddits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            })
            .addCase(createSubreddit.pending, (state) => {
                state.loading = true;
            })
            .addCase(createSubreddit.fulfilled, (state, action) => {
                state.subreddits.push(action.payload);
                state.loading = false;
            })
            .addCase(createSubreddit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export const { resetSubredditState } = subredditSlice.actions;

export default subredditSlice.reducer;
