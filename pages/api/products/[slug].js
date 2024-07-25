import prisma from '@/lib/prisma'
import { runMiddleware } from '@/middleware/corsMiddleware'

const handler = async (req, res) => {
    await runMiddleware(req, res)
    if (req.method === 'GET') {
        const product = await prisma.product.findUnique({
            where: {
                sku: req.query.slug,
            },
            select: {
                sku:true,
                name: true,
                price: true,
                discount: true,
                discountPrice: true,
                headline: true,
                mainImage: true,
                shippingPrice: true
            }
        })
        res.status(200).json(product)
    }
}

export default handler