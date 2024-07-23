import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/redux/slices/cartSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        thunk: true
    }),
    devTools: process.env.NODE_ENV === 'development'
})

export default store