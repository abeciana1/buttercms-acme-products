import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        thunk: true
    }),
    devTools: process.env.NODE_ENV === 'development'
})

export default store