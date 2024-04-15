import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  id: "",
  msg: "",
  user: "",
  token: "",
  loading: false,
  error: "",
  isLoggedIn: false
};

export const signUpUser = createAsyncThunk('user/signup', async (body, { rejectWithValue }) => {
  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "post",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to sign up");
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to sign up");
  }
});

export const loginUser = createAsyncThunk('user/login', async (body, { rejectWithValue }) => {
  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "post",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to Login");
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to Login");
  }
});


export const logout = createAsyncThunk('user/logoutUser', async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/logout", { 
        method: "GET",
        credentials: 'include' 
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to logout");
      }
      return; 
    } catch (error) {
      return rejectWithValue(error.message || "Error");
    }
});



export const checkLoginStatus = createAsyncThunk('user/checkLogin', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:5000/check-auth", {
      credentials: 'include',
      method: 'GET'
    });
    const data = await response.json();
    if (response.ok) {
      return data; 
    } else {
      return rejectWithValue(data);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});



const FormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    resetState: () => initialState 
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.sessionId;
        state.loading = false;
        state.error = "";
        state.isLoggedIn = true;
        state.id = action.payload.id;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.email = action.payload.email;
        state.token = action.payload.sessionId;
        state.loading = false;
        state.error = "";
        state.isLoggedIn = true;
        state.id = action.payload.id;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = "";
        state.token = "";
        state.isLoggedIn = false;
        
       
      })
      .addCase(logout.rejected, (state) => {
        state.user = "";
        state.token = "";
        state.isLoggedIn = false;
        
       
      })
      
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      
      })
      .addCase(checkLoginStatus.rejected, (state, action) => {
        state.isLoggedIn = false;
  
      })
  }
});

export const { resetState } = FormSlice.actions;

export default FormSlice.reducer;
