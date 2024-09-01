import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../config';
// Initial state
const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: null,
};

// Register user
export const registerUser = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Login user
export const loginUser = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Logout user
export const logoutUser = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('user');
    return null;
});

// Update user
export const updateUser = createAsyncThunk('users/profileUpdate', async (formData, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState();
        const config = {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
                'Content-Type': 'multipart/form-data',
            }
        };
        // console.log(config)
        const { data } = await axios.put(`${API_BASE_URL}/users/profile`, formData, config);
        // console.log(data)
        localStorage.setItem('user', JSON.stringify(data));
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// // Delete task
// export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
//     try {
//         const { auth } = thunkAPI.getState();
//         const config = { headers: { Authorization: `Bearer ${auth.user.token}` } };
//         await axios.delete(`${API_BASE_URL}/tasks/${id}`, config);
//         return id;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.message);
//     }
// });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            })
            // Update user
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.user = payload;
            })
        // Delete user
        // .addCase(deleteuser.fulfilled, (state, { payload }) => {
        //     // add your case state update 
        // });
    },
});

export default authSlice.reducer;
