import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const backend = "https://4000-harshilsharm-settyltask-iq2yldz8xm5.ws-us102.gitpod.io"

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const response = await axios.get(`${backend}/api/user/profile`, { withCredentials: true });
    return response.data;
});

export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
    try {
        const response = await axios.post(`${backend}/api/user/login`, credentials);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userInfo: null,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },

})

export default userSlice.reducer;