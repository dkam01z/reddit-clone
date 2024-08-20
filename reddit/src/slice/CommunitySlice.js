import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

const initialState  = {
    communities: [],
    selectedCommunity: null,
    loading: false
}


export const fetchCommunities = createAsyncThunk('community/fetchCommunities', async (_, {rejectWithValue}) => {
    try {
        const response = await fetch('http://localhost:5000/fetchCommunities');

        if (!response.ok) {
            const error = response.json()
            throw new Error(error.message);
        }

        const data = await response.json();
        return data;
    } catch(error) {
        return rejectWithValue(error.message);
    }
} )

export const filterCommunityByName = createAction('posts/filterCommunityByName', (communityName) => {
  return {
    payload: communityName,
  };
});



export const postCommunity = createAsyncThunk(
  'community/postCommunity',
  async ({ communityName, communityType, user_id }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/postCommunity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          communityName,
          communityType,
          user_id
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



const CommunitySlice = createSlice({
    name: 'community',
    initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommunities.fulfilled, (state,action) => {
                state.loading = false
                state.community = action.payload
                
            })
            .addCase(fetchCommunities.pending, (state,action) => {
                state.loading = true
                state.community = action.payload
            })
            .addCase(fetchCommunities.rejected, (state,action) => {
                state.loading = false
            })
            .addCase(filterCommunityByName, (state, action) => {
              const community = state.communities.find(community => community.name === action.payload);
              state.selectedCommunity = community || null;
            });
            
    }

})

export default CommunitySlice.reducer;