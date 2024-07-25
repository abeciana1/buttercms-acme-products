import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: {
        subTotal: 0,
        shippingTotal: 0
    },
    cartItems: [],
    cartItemsCount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setCart: (state, action ) => {
            state.cart = action.payload
        },
        setCartCount: (state, action) => {
            state.cartItemsCount = action.payload
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload
        },
        clearCart: (state) => {
            state.cartItems = []
            state.cartItemsCount = 0
            state.cart = null
        }
    }
})

export const {
    setCart,
    setCartCount,
    setCartItems,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer