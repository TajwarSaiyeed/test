import { forceUpdate } from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import importService from './importService'

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const importOrders = createAsyncThunk(
    'import/importOrders',
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await importService.importOrders(token)
        } catch (error) {
            const message = 
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const importSlice = createSlice({
    name: 'import',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(importOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(importOrders.fulfilled, (state, action) => {
                alert('Import successful. Please refresh the page.');
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(importOrders.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
    }
})

export const { reset } = importSlice.actions
export default importSlice.reducer