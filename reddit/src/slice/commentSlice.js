import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  loading: false,
  error: '',
};

export const fetchCommentsByPostId = createAsyncThunk(
  'comments/fetchByPostId',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/fetchComments?postId=${postId}`, {
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
  }
);

const nestComments = (comments) => {
  const commentMap = {};
  comments.forEach(comment => {
    comment.subcomments = [];
    commentMap[comment.id] = comment;
  });

  const nestedComments = [];
  console.log(nestedComments)
  comments.forEach(comment => {
    if (comment.parent_id === null) {
      nestedComments.push(comment);
      console.log(nestedComments)
    } else {
      if (commentMap[comment.parent_id]) {
        commentMap[comment.parent_id].subcomments.push(comment);
      }
    }
  });

  return nestedComments;
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.comments = nestComments(action.payload);
        state.loading = false;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = commentSlice.actions;

export default commentSlice.reducer;
