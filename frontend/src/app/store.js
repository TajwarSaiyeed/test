import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import orderReducer from '../features/orders/orderSlice'
import importReducer from '../features/import/importSlice'
import noteReducer from '../features/notes/noteSlice'
import invoiceReducer from '../features/invoices/invoiceSlice'
import bagsReducer from '../features/bags/bagsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    orders: orderReducer,
    import: importReducer,
    notes: noteReducer,
    invoices: invoiceReducer,
    bags: bagsReducer
  },
})
