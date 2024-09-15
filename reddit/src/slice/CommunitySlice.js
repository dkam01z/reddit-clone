import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

const initialState = {
  communities: [],
  selectedCommunity: null,
  topCommunities: [],
  loading: false,
};

export const fetchCommunities = createAsyncThunk(
  "community/fetchCommunities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/fetchCommunities");

      if (!response.ok) {
        const error = response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchTopCommunities = createAsyncThunk(
  "community/fetchTopCommunities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/fetchTopCommunities", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
    

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const filterCommunityByName = createAsyncThunk(
  "community/filterCommunity",
  async (communityName, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/fetchCommunity", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ communityName }),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postCommunity = createAsyncThunk(
  "community/postCommunity",
  async ({ communityName, communityType, user_id }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/postCommunity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          communityName,
          communityType,
          user_id,
        }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Network response was not ok");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CommunitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.topCommunities = action.payload;
        
      })
      .addCase(fetchTopCommunities.pending, (state, action) => {
        state.loading = true;
     
      })
      .addCase(fetchTopCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch communities";
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.pending, (state, action) => {
        state.loading = true;
       
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch communities";
      })
      .addCase(filterCommunityByName.fulfilled, (state, action) => {
        state.selectedCommunity = action.payload || null;
      })
      .addCase(filterCommunityByName.rejected, (state, action) => {
        state.error = action.payload || "Failed to filter community";
      });
  },
});

export default CommunitySlice.reducer;
