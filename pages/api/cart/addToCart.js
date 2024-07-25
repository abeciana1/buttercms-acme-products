import prisma from '@/lib/prisma'
import cookie from 'cookie';
import { runMiddleware } from '@/middleware/corsMiddleware'

const handler = async (req, res) => {
    await runMiddleware(req, res)
    if (req.method === 'POST') {
        const cookies = cookie.parse(req.headers.cookie || '')
        let seshId = JSON.parse(cookies.ACMEcart)?.sessionId
        //* find product
        let foundProduct = await prisma.product.findUnique({
            where: {
                sku: req.body?.productSku
            }
        })
        // * find cart
        let foundCart = await prisma.cart.findUnique({
            where: {
                sessionId: seshId
            },
            include: {
                cartItems: {
                    include: {
                        product: true
                    }
                }
            }
        })
        // * find cart item
        let foundCartItem = await prisma.cartItem.findUnique({
            where: {
                cartId: foundCart.id,
                productId: foundProduct.id
            },
            include: {
                product: true
            }
        })

        if (foundCartItem) {
            await prisma.$transaction(async (prisma) => {
                let updatedCartItem = await prisma.cartItem.update({
                    where: {
                        id: foundCartItem.id
                    },
                    data: {
                        quantity: foundCartItem.quantity + req.body?.quantity,
                    },
                    include: {
                        product: {
                            select: {
                                price: true,
                                discount: true,
                                discountPrice: true,
                                shippingPrice: true,
                            }
                        }
                    }
                })
                if (updatedCartItem) {
                    const newSubTotal = foundCart.cartItems.reduce((acc, item) => {
                        const itemTotal = item.product.discount > 0
                        ? item.product.discountPrice * item.quantity
                        : item.product.price * item.quantity;
                        return acc + itemTotal;
                    }, 0);
                    const newShippingTotal = foundCart.cartItems.reduce((acc, item) => {
                        return acc + (item.product.shippingPrice * item.quantity);
                    }, 0)
                    await prisma.cart.update({
                        where: {
                            id: foundCart.id
                        },
                        data:{
                            subTotal: newSubTotal,
                            shippingTotal: newShippingTotal,
                        }
                    })
                }
            })
        } else if (foundCart && foundProduct) {
            console.log('creating new cart item')
            await prisma.$transaction(async (prisma) => {
                const newCartItem = await prisma.cartItem.create({
                    data: {
                        cartId: foundCart.id,
                        productId: foundProduct.id,
                        quantity: req.body?.quantity,
                    },
                    include: {
                        product: {
                            select: {
                                price: true,
                                discount: true,
                                discountPrice: true,
                                shippingPrice: true,
                            }
                        }
                    }
                })
                const allCartItems = [...foundCart.cartItems, newCartItem]
                const newSubTotal = allCartItems.reduce((acc, item) => {
                    const itemTotal = item.product.discount > 0
                      ? item.product.discountPrice * item.quantity
                      : item.product.price * item.quantity;
                    return acc + itemTotal;
                }, 0);
                const newShippingTotal = allCartItems.reduce((acc, item) => {
                    return acc + (item.product.shippingPrice * item.quantity);
                }, 0)
                await prisma.cart.update({
                    where: {
                        id: foundCart.id
                    },
                    data: {
                        subTotal: newSubTotal,
                        shippingTotal: newShippingTotal,
                    }
                })
            })
        }
    }
}

export default handler