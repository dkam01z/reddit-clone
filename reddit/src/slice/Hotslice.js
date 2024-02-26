import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    postID: "",
    postAuthor: "",
    postName: "",
    postCount: "",
    user_id: ""
    
}




export const fetchPosts = createAsyncThunk('post/fetchPost', async (_, { rejectWithValue }) => {
    try {
        const response = await fetch('', {
            method: "GET",
            credentials: 'include'
        })
    }

})