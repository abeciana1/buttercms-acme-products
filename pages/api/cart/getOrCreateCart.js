import prisma from '@/lib/prisma'
import { runMiddleware } from '../../../middleware/corsMiddleware'

const handler = async (req, res) => {
    await runMiddleware(req, res)
    if (req.method === 'POST') {
        const sessionId = req.headers['x-session-id'];

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        try {
            let cart = await prisma.cart.findUnique({
                where: { sessionId },
                include: {
                    cartItems: true
                }
            });
    
            if (!cart) {
                cart = await prisma.cart.create({
                    data: {
                        sessionId: sessionId,
                        subTotal: 0.00,
                        shippingTotal: 0.00,
                    },
                    include: {
                        cartItems: true
                    }
                });
            }

            const cartItemsCount = cart.cartItems.reduce((total, item) => total + item.quantity, 0);
    
            res.status(200).json({ success: true, cart: { ...cart, cartItemsCount } });
        } catch (error) {
            res.status(500).json({ error: 'Database query failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

export default handler