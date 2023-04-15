import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bagsService from './bagsService'

const initialState = {
    bags: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Get bags
export const getBags = createAsyncThunk(
  'orders/getBags',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await bagsService.getBags(token)
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

// Update bags
export const updateBags = createAsyncThunk(
  'orders/updateBags',
  async (bagsData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await bagsService.updateBags(bagsData._id, bagsData, token)
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

export const bagsSlice = createSlice({
    name: 'bags',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBags.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBags.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.bags = action.payload
            })
            .addCase(getBags.rejected, (state) => {
              state.isLoading = false
              state.isError = true
            })
            .addCase(updateBags.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateBags.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.bags = action.payload
            })
            .addCase(updateBags.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
            })
    }
})

export const { reset } = bagsSlice.actions
export default bagsSlice.reducer