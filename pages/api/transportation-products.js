import prisma from '@/lib/prisma'
import { runMiddleware } from '@/middleware/corsMiddleware'

const handler = async (req, res) => {
    // await runMiddleware(req, res)
    if (req.method === 'GET') {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    slug: {
                        equals: 'transportation'
                    }
                }
            },
            select: {
                name: true,
                discount: true,
                price: true,
                mainImage: true,
                discountPrice: true,
                sku: true
            }
        })
        res.status(200).json(products)
    }
}

export default handler