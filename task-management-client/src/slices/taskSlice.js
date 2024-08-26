import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Initial state
const initialState = {
    tasks: [],
    task: {},
    loading: false,
    error: null,
};

// Fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetch', async (_, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState();
        const config = { headers: { Authorization: `Bearer ${auth.user.token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/tasks`, config);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Fetch tasks
export const fetchTask = createAsyncThunk('tasks/fetchById', async (id, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState();
        const config = { headers: { Authorization: `Bearer ${auth.user.token}` } };
        const { data } = await axios.get(`${API_BASE_URL}/tasks/${id}`, config);
        // console.log(data)
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Create task
export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
    try {
        // console.log(taskData)
        const { auth } = thunkAPI.getState();
        const config = { headers: { Authorization: `Bearer ${auth.user.token}` } };
        const { data } = await axios.post(`${API_BASE_URL}/tasks`, taskData, config);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Update task
export const updateTask = createAsyncThunk('tasks/update', async ({ id, taskData }, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState();
        const config = { headers: { Authorization: `Bearer ${auth.user.token}` } };
        // console.log(id, taskData)
        const { data } = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData, config);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Delete task
export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState();
        const config = { headers: { Authorization: `Bearer ${auth.user.token}` } };
        await axios.delete(`${API_BASE_URL}/tasks/${id}`, config);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.tasks = payload;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // Fetch a single task by ID
            .addCase(fetchTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTask.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.task = payload;
                state.error = null;
            })
            .addCase(fetchTask.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // Create task
            .addCase(createTask.fulfilled, (state, { payload }) => {
                state.tasks.push(payload);
            })
            // Update task
            .addCase(updateTask.fulfilled, (state, { payload }) => {
                const index = state.tasks.findIndex(task => task._id === payload._id);
                if (index !== -1) state.tasks[index] = payload;
            })
            // Delete task
            .addCase(deleteTask.fulfilled, (state, { payload }) => {
                state.tasks = state.tasks.filter(task => task._id !== payload);
            });
    },
});

export default taskSlice.reducer;
