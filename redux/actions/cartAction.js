import axios from 'axios'
import { setCartCount } from '@/redux/slices/cartSlice'

export const addProductToCart = (quantity, productSku) => {
    return (dispatch, getState) => {
        const currentCartCount = getState().cart?.cartItemsCount
        dispatch(setCartCount(currentCartCount + quantity))
        axios.post('/api/cart/addToCart', { quantity, productSku })
    }
}