import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

import {backendUrl} from '../constants';

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
    const response = await axios.get(`${backendUrl}/api/user/profile`, { withCredentials: true });
    return response.data;
});

export const registerUser = createAsyncThunk('user/registerUser', async (credentials) => {
    try {
        const response = await axios.post(`${backendUrl}/api/user/register`, credentials, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
    try {
        const response = await axios.post(`${backendUrl}/api/user/login`, credentials, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
    const response = await axios.get(`${backendUrl}/api/user/all`, { withCredentials: true });
    return response.data;
});

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
    const response = await axios.get(`${backendUrl}/api/user/logout`, { withCredentials: true });
    return response.data;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userInfo: null,
        allUsers: null,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
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
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = action.payload;
                state.data = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = null;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },

})

export const { clearError } = userSlice.actions;

export default userSlice.reducer;