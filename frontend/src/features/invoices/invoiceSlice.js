import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import invoiceService from './invoiceService'

const initialState = {
    invoices: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Create invoice
export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async (items, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await invoiceService.createInvoice(items, token)
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

// Get invoices
export const getInvoices = createAsyncThunk(
  'orders/getInvoices',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await invoiceService.getInvoices(token)
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

// Create pdf
export const createPdf = createAsyncThunk(
  'invoices/createPdf',
  async (invoiceId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await invoiceService.createPdf(invoiceId, token)
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

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createInvoice.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createInvoice.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              alert('Invoices generated.');
            })
            .addCase(createInvoice.rejected, (state) => {
              state.isLoading = false
              state.isError = true
            })
            .addCase(getInvoices.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInvoices.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.invoices = action.payload
            })
            .addCase(getInvoices.rejected, (state) => {
              state.isLoading = false
              state.isError = true
            })
            .addCase(createPdf.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPdf.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
            })
            .addCase(createPdf.rejected, (state) => {
              state.isLoading = false
              state.isError = true
            })
    }
})

export const { reset } = invoiceSlice.actions
export default invoiceSlice.reducer