import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/redux/slices/cartSlice'
import instanceReducer from '@/redux/slices/instanceSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        instance: instanceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        thunk: true
    }),
    devTools: process.env.NODE_ENV === 'development'
})

export default store