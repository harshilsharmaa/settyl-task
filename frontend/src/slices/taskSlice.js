import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const backend = "https://4000-harshilsharm-settyltask-iq2yldz8xm5.ws-us102.gitpod.io"

export const createTask = createAsyncThunk('tasks/createTask', async (data) => {
    try {
        const response = await axios.post(`${backend}/api/task/create`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        loading: false,
        tasksInfo: null,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasksInfo = action.payload;
                state.error = null;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },

})

export default taskSlice.reducer;