const initialState = {
    cart: null,
    cartItems: [],
    cartNum: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        setCart: (state, action ) => {
            state.cart = action.payload
        },
        setCartNum: (state, action) => {
            state.cartNum = action.payload
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload
        },
        clearCart: (state) => {
            state.cartItems = []
            state.cartNum = 0
            state.cart = null
        }
    }
})

export const {
    setCart,
    setCartNum,
    setCartItems,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer