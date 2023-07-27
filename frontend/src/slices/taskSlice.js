import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import {backendUrl} from '../constants';

export const createTask = createAsyncThunk('tasks/createTask', async (data) => {
    try {
        const response = await axios.post(`${backendUrl}/api/task/create`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
});

export const fetchAllTasks = createAsyncThunk('tasks/fetchAllTasks', async () => {
    const response = await axios.get(`${backendUrl}/api/task/all`, { withCredentials: true });
    return response.data;
})

export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({taskId, status}) => {
    const response = await axios.patch(`${backendUrl}/api/task/update/status/${taskId}`, {status}, { withCredentials: true });
    return response.data;
})

export const updateTask = createAsyncThunk('tasks/updateTask', async ({data, taskId}) => {
    const response = await axios.put(`${backendUrl}/api/task/update/${taskId}`, data, { withCredentials: true });
    return response.data;
})


export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
    const response = await axios.delete(`${backendUrl}/api/task/delete/${taskId}`, { withCredentials: true });
    return response.data;
})

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        loading: false,
        tasksInfo: null,
        taskUpdateInfo: null,
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
                state.taskUpdateInfo = action.payload;
                state.error = null;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateTaskStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.taskUpdateInfo = action.payload;
                state.error = null;
            })
            .addCase(updateTaskStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.taskUpdateInfo = action.payload;
                state.error = null;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.taskUpdateInfo = action.payload;
                state.error = null;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchAllTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasksInfo = action.payload;
                state.error = null;
            })
            .addCase(fetchAllTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }

})

export default taskSlice.reducer;