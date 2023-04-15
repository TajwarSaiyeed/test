import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
    orders: [],
    items: [],
    selectedItems: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getOrders = createAsyncThunk(
    'orders/getOrders',
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await orderService.getOrders(token)
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



export const getItems = createAsyncThunk(
    'orders/getItems',
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await orderService.getItems(token)
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

// Update order
export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (orderData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.updateOrder(orderData._id, orderData, token)
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

// Update item
export const updateItem = createAsyncThunk(
  'orders/updateItem',
  async (itemData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.updateItem(itemData._id, itemData, token)
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

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        reset: (state) => initialState,
        updateSelectedItems: (state, action) => {state.selectedItems = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.orders = action.payload
            })
            .addCase(getOrders.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
            })
            .addCase(getItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getItems.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.items = action.payload
            })
            .addCase(getItems.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
            })
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true

              var newOrders = [...state.orders]
              newOrders[
                newOrders.findIndex(x => x._id == action.payload._id)
               ] = action.payload
              state.orders = newOrders
            })
            .addCase(updateOrder.rejected, (state) => {
              state.isLoading = false
              state.isError = true
            })
            .addCase(updateItem.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateItem.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true

              var newItems = [...state.items]
              newItems[
                newItems.findIndex(x => x._id == action.payload._id)
               ] = action.payload
              state.items = newItems
            })
            .addCase(updateItem.rejected, (state) => {
              state.isLoading = false
              state.isError = true
            })
    }
})

export const { reset, updateSelectedItems } = orderSlice.actions
export default orderSlice.reducer