import { useEffect } from 'react'
import { PageLayoutWrapper } from '@/components/_layouts'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import axios from 'axios'
import cookie from 'cookie';
import { setCart, setCartItems } from '@/redux/slices/cartSlice'
import CartProduct from '@/components/_products/CartProduct'
import useResponsiveness from '@/lib/hooks/useResponsiveness'
import cx from 'classnames'

const CartPage = ({
    cart,
    cartItems
}) => {
    const dispatch = useAppDispatch()
    const cartState = useAppSelector(state => state.cart.cart) || cart
    const cartItemsState = useAppSelector(state => state.cart.cartItems) || cartItems
    const cartCount = useAppSelector(state => state.cart.cartItemsCount)
    const { isMobile, isTablet, isDesktop } = useResponsiveness() || {}

    useEffect(() => {
        if (cart) {
            dispatch(setCart(cart))
            dispatch(setCartItems(cartItems))
        }
    }, [cart, cartItems])

    return (
        <>
            <PageLayoutWrapper>
                <>
                    <div>
                        <h1 className="font-bold">Cart</h1>
                        <div className="font-bold text-2xl flex items-center gap-2">
                            <span>${cartState.subTotal}</span>
                            <span className="">&middot;</span>
                            <span>{cartCount} item{cartCount > 1 ? "s" : ""}</span>
                        </div>
                    </div>
                    <section>
                        <div className="text-xl py-3">Estimated shipping: ${(cartState.shippingTotal).toFixed(2)}</div>
                        <section className={cx("flex",{
                            ["flex-row gap-10"]: isDesktop,
                            ["flex-col gap-5"]: (isMobile || isTablet)
                        })}>
                            <section className="pt-5 w-full">
                                {cartItemsState.length < 1 && <div>sorry nothing in cart at the moment</div>}
                                {cartItemsState.length > 0 && cartItemsState?.map((cartItem, index) => {
                                    return (
                                        <CartProduct
                                            key={index}
                                            cartItem={cartItem}
                                        />
                                    )
                                })}
                            </section>
                            <section className={cx("w-full pt-5", {
                                ["max-w-96"]: isDesktop
                            })}>
                                <h2 className="font-bold">Order summary</h2>
                                <div className="bg-white p-5 rounded-lg">
                                    <div className="flex justify-between">
                                        <div className="font-bold text-lg">Order subtotal:</div>
                                        <div className="font-bold text-lg">${(cartState.subTotal).toFixed(2)}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="font-bold text-lg">Estimated shipping:</div>
                                        <div className="font-bold text-lg">${(cartState.shippingTotal).toFixed(2)}</div>
                                    </div>
                                    <div className="flex justify-between border-t-2 border-gray-700 mt-2 pt-2">
                                        <div className="font-bold text-lg">Total:</div>
                                        <div className="font-bold text-lg">${(cartState.subTotal + cartState.shippingTotal).toFixed(2)}</div>
                                    </div>
                                </div>
                            </section>
                        </section>
                    </section>
                </>
            </PageLayoutWrapper>
        </>
    )
}

export default CartPage

export const getServerSideProps = async (context) => {
    try {
        let cookies = cookie.parse(context.req.headers.cookie)
        let seshId = JSON.parse(cookies.ACMEcart).sessionId;
        const res = await axios.get('https://buttercms-acme-products-uevi.vercel.app/api/cart/getCartItems', {
            "headers": {
                "cookie": seshId,
            },
            "withCredentials": true,
        });
        return {
            props: {
                cart: res?.data?.cart,
                cartItems: res?.data?.cart?.cartItems,
            }
        }
    } catch (error) {
        return { props: { cartItems: [] } };
    }
}