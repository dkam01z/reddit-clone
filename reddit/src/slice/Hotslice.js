import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    loading: false,
    error: ""
}




export const submitPost = createAsyncThunk(
    'posts/submitPost',
    async ({ activeButton, dataToSubmit }, { rejectWithValue }) => {
      try {
       

        const response = await fetch('http://localhost:5000/submitPost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: activeButton,
            dataToSubmit
          }),
          credentials: 'include',
        });
  
        if (!response.ok) throw new Error('Network response was not ok');
  
        return await response.json();
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const fetchPost = createAsyncThunk('post/fetchPost', async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/fetchPosts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
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
  
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      resetState: () => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPost.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchPost.fulfilled, (state, action) => {
          state.posts = action.payload;
          state.loading = false;
        })
        .addCase(fetchPost.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'An error occurred';
        });
    },
  });
  

  
  export default postSlice.reducer;
  