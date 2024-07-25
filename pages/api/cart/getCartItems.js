import prisma from '@/lib/prisma'
import { runMiddleware } from '@/middleware/corsMiddleware'

const handler = async (req, res) => {
    // await runMiddleware(req, res)
    if (req.method === 'GET') {
        const cart = await prisma.cart.findUnique({
            where: {
                sessionId: req.headers['x-session-id'] || req.headers?.cookie,
            },
            include: {
                cartItems: {
                    include: {
                        product: true
                    }
                }
            }
        })
        res.status(200).json({ success: true, cart })
    }
}

export default handler