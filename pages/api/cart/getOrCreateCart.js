import prisma from '@/lib/prisma'
import { runMiddleware } from '../../../middleware/corsMiddleware'

const handler = async (req, res) => {
    console.log('getorcreate')
    await runMiddleware(req, res)
    if (req.method === 'POST') {
        const sessionId = req.headers['x-session-id'];

        if (!sessionId) {
            return res.status(400).json({ error: 'Session ID is required' });
        }

        try {
            let cart = await prisma.cart.findUnique({
            where: { sessionId },
            });

            console.log('GOCcart', cart)
    
            if (!cart) {
                cart = await prisma.cart.create({
                    data: {
                        sessionId: sessionId,
                        subTotal: 0.00,
                        shippingTotal: 0.00,
                    },
                });
            }
    
            res.status(200).json({ success: true, cart });
        } catch (error) {
            res.status(500).json({ error: 'Database query failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}

export default handler